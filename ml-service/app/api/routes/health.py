from fastapi import APIRouter
from app.core.model_manager import get_model_manager
from app.schemas.response import HealthResponse, ModelsResponse

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
def health_check():
    manager = get_model_manager()
    loaded_models = list(manager.models.keys())
    return HealthResponse(
        status="ok",
        loaded_models=loaded_models,
        version="1.0.0"
    )

@router.get("/models", response_model=ModelsResponse)
def get_models():
    manager = get_model_manager()
    info = manager.get_loaded_models_info()
    models_list = [{"name": k, "format": v["format"], "status": v["status"]} for k, v in info.items()]
    return ModelsResponse(models=models_list)
