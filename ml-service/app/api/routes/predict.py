import time
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.core.model_manager import get_model_manager
from app.schemas.request import PredictRequest
from app.schemas.response import PredictResponse
from app.utils.preprocessor import preprocess_features
import logging

router = APIRouter()
logger = logging.getLogger("predict_route")

@router.post("/predict/{model_name}", response_model=PredictResponse)
def predict(model_name: str, request: PredictRequest):
    start_time = time.time()
    
    manager = get_model_manager()
    model_info = manager.get_model(model_name)
    
    if not model_info:
        return JSONResponse(
            status_code=404,
            content={
                "error": "model_not_found",
                "message": f"Model '{model_name}' is not loaded.",
                "available_models": list(manager.models.keys())
            }
        )
        
    if model_info["status"] != "loaded":
        return JSONResponse(
            status_code=503,
            content={
                "error": "model_load_error",
                "message": f"Model '{model_name}' failed to load: {model_info.get('error', 'unknown error')}"
            }
        )

    model = model_info["model"]
    scaler = model_info.get("scaler")
    format = model_info["format"]
    
    try:
        X = preprocess_features(model_name, request.features, scaler)
        
        # Simple dummy prediction logic if no model file exists yet
        if model is None:
            # We allow empty models initially, just return a dummy
            prediction = 1
            probability = {"Negative": 0.5, "Positive": 0.5}
            label = "Dummy Positive"
        else:
            # Scikit-learn
            if format in ['.pkl', '.joblib']:
                pred = model.predict(X)[0]
                prediction = int(pred) if hasattr(pred, "item") else pred
                
                label = str(prediction)
                probability = None
                if hasattr(model, "predict_proba"):
                    proba = model.predict_proba(X)[0]
                    # Attempt to map to classes if available
                    if hasattr(model, "classes_"):
                        probability = {str(c): float(p) for c, p in zip(model.classes_, proba)}
                    else:
                        probability = {f"class_{i}": float(p) for i, p in enumerate(proba)}
            else:
                # For other formats, a proper inference logic should be added here
                # based on user's models later.
                prediction = 1
                label = "Unknown format prediction"
                probability = None

        inference_time_ms = (time.time() - start_time) * 1000
        
        return PredictResponse(
            model=model_name,
            prediction=prediction,
            label=label,
            probability=probability,
            inference_time_ms=inference_time_ms
        )
    except Exception as e:
        logger.error(f"Inference error for model {model_name}: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "error": "inference_error",
                "message": str(e)
            }
        )
