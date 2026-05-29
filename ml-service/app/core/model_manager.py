import os
import glob
import logging
from typing import Any, Dict

logger = logging.getLogger("model_manager")

class ModelManager:
    def __init__(self, model_dir: str):
        self.model_dir = model_dir
        self.models: Dict[str, Dict[str, Any]] = {}

    def load_all_models(self):
        logger.info(f"Scanning for models in {self.model_dir}...")
        self.models.clear()
        
        if not os.path.exists(self.model_dir):
            logger.warning(f"Model directory {self.model_dir} does not exist.")
            return

        for root, dirs, files in os.walk(self.model_dir):
            for file in files:
                if file.startswith("model."):
                    model_name = os.path.basename(root)
                    file_path = os.path.join(root, file)
                    self._load_model(model_name, file_path)

    def _load_model(self, model_name: str, file_path: str):
        ext = os.path.splitext(file_path)[1].lower()
        logger.info(f"Attempting to load model '{model_name}' from {file_path}")
        try:
            model_obj = None
            if ext in ['.pkl', '.joblib']:
                import joblib
                model_obj = joblib.load(file_path)
            elif ext in ['.h5', '.keras']:
                from tensorflow.keras.models import load_model
                model_obj = load_model(file_path)
            elif ext in ['.pt', '.pth']:
                import torch
                model_obj = torch.load(file_path, map_location=torch.device('cpu'))
                model_obj.eval()
            elif ext == '.onnx':
                import onnxruntime as ort
                model_obj = ort.InferenceSession(file_path)
            else:
                logger.warning(f"Unsupported model extension '{ext}' for {model_name}")
                return
            
            scaler_obj = None
            for scaler_ext in ['.pkl', '.joblib']:
                scaler_path = os.path.join(os.path.dirname(file_path), f"scaler{scaler_ext}")
                if os.path.exists(scaler_path):
                    import joblib
                    scaler_obj = joblib.load(scaler_path)
                    logger.info(f"Successfully loaded scaler for '{model_name}'")
                    break

            # If the model was dumped as a dictionary (e.g. Afra's model), extract the actual model
            actual_model = model_obj
            if isinstance(model_obj, dict) and "model" in model_obj:
                actual_model = model_obj["model"]
                logger.info(f"Extracted actual model from dictionary for '{model_name}'")

            self.models[model_name] = {
                "model": actual_model,
                "scaler": scaler_obj,
                "format": ext,
                "status": "loaded"
            }
            logger.info(f"Successfully loaded model '{model_name}'")
        except Exception as e:
            logger.error(f"Failed to load model '{model_name}': {e}")
            self.models[model_name] = {
                "model": None,
                "format": ext,
                "status": "error",
                "error": str(e)
            }

    def get_model(self, model_name: str) -> Any:
        return self.models.get(model_name)

    def get_loaded_models_info(self) -> Dict[str, Any]:
        return {
            name: {"format": info["format"], "status": info["status"]} 
            for name, info in self.models.items()
        }

model_manager = None

def init_model_manager(model_dir: str):
    global model_manager
    model_manager = ModelManager(model_dir)
    model_manager.load_all_models()

def get_model_manager() -> ModelManager:
    return model_manager
