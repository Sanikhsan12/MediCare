import logging
from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.model_manager import init_model_manager
from app.api.routes import health, predict
from app.api.middleware.error_handler import add_error_handling

logging.basicConfig(level=settings.LOG_LEVEL.upper(), format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up ML Service...")
    init_model_manager(settings.MODEL_DIR)
    yield
    logger.info("Shutting down ML Service...")

app = FastAPI(title="MediCare ML Service", lifespan=lifespan)

add_error_handling(app)

app.include_router(health.router, tags=["Health"])
app.include_router(predict.router, tags=["Predict"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
