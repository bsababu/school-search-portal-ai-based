
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    db_url: str | None = None
    open_ai_key: str = Field(..., alias="OPENAI_API_KEY")
    qdrant_url: str | None = None
    qdrant_keys: str | None = None

    model_config = SettingsConfigDict(
        env_file="../../.env", 
        env_file_encoding="utf-8",
        populate_by_name=True,
        extra="ignore" 
        )

settings = Settings()