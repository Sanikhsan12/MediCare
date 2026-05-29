package model

type ClassifyRequest struct {
	Topic    string                 `json:"topic"`
	Features map[string]interface{} `json:"features"`
}
