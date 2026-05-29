from pydantic import BaseModel
from typing import Dict, Optional, Any

class PredictResponse(BaseModel):
    model: str
    prediction: Any
    label: str
    probability: Optional[Dict[str, float]] = None
    inference_time_ms: float

class HealthResponse(BaseModel):
    status: str
    loaded_models: list[str]
    version: str

class ModelsResponse(BaseModel):
    models: list[Dict[str, Any]]

class ErrorResponse(BaseModel):
    error: str
    message: str
    available_models: Optional[list[str]] = None
