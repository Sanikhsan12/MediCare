import pandas as pd
from typing import Dict, Any

def preprocess_features(model_name: str, features: Dict[str, Any], scaler: Any = None) -> Any:
    # Convert features dict to a single-row DataFrame
    # Models generally expect a 2D array or DataFrame
    df = pd.DataFrame([features])
    
    # Cast strings to numeric if possible (e.g., "1" -> 1)
    df = df.apply(pd.to_numeric, errors='ignore')
    
    if scaler is not None:
        return scaler.transform(df)
        
    return df
