import pandas as pd
from typing import Dict, Any

def preprocess_features(model_name: str, features: Dict[str, Any], scaler: Any = None, model: Any = None) -> Any:
    # Convert features dict to a single-row DataFrame
    df = pd.DataFrame([features])
    
    # Cast strings to numeric if possible
    # Ganti errors jadi 'coerce' agar konversi yang gagal diubah jadi NaN
    df = df.apply(pd.to_numeric, errors='coerce')
    
    # Check if the model has a specific feature order expected
    if model is not None and hasattr(model, 'feature_names_in_'):
        expected_features = list(model.feature_names_in_)
        # Reorder columns to match model's expected order
        # Pad with NaNs for any missing features (though frontend should send all)
        for col in expected_features:
            if col not in df.columns:
                df[col] = pd.NA
        df = df[expected_features]
    
    if scaler is not None:
        return scaler.transform(df)
        
    return df