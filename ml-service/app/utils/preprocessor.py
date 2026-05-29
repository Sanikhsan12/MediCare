import pandas as pd
from typing import Dict, Any

def preprocess_features(model_name: str, features: Dict[str, Any], scaler: Any = None) -> Any:
    # Convert features dict to a single-row DataFrame
    df = pd.DataFrame([features])
    
    # Cast strings to numeric if possible
    # Ganti errors jadi 'coerce' agar konversi yang gagal diubah jadi NaN
    df = df.apply(pd.to_numeric, errors='coerce')
    
    if scaler is not None:
        return scaler.transform(df)
        
    return df