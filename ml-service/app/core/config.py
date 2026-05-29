from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    MODEL_DIR: str = "/app/models"
    LOG_LEVEL: str = "info"
    RELOAD_SECRET: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
