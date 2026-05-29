package model

type ClassifyResponse struct {
	Topic           string             `json:"topic"`
	Prediction      string             `json:"prediction"`
	Probability     map[string]float64 `json:"probability,omitempty"`
	InferenceTimeMs float64            `json:"inference_time_ms"`
}

type MLRequest struct {
	Features map[string]interface{} `json:"features"`
}

type MLResponse struct {
	Model           string             `json:"model"`
	Prediction      interface{}        `json:"prediction"` // Can be string or int
	Label           string             `json:"label"`
	Probability     map[string]float64 `json:"probability"`
	InferenceTimeMs float64            `json:"inference_time_ms"`
}

type ErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
}
