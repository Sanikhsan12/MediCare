package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"be-service/internal/model"
	"be-service/internal/service"
	"be-service/internal/validator"
)

type ClassifyHandler struct {
	MLClient *service.MLClient
}

func NewClassifyHandler(mlClient *service.MLClient) *ClassifyHandler {
	return &ClassifyHandler{
		MLClient: mlClient,
	}
}

func (h *ClassifyHandler) Handle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req model.ClassifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.ErrorResponse{
			Error:   "invalid_json",
			Message: "failed to decode json body",
		})
		return
	}

	if err := validator.ValidateClassifyRequest(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(model.ErrorResponse{
			Error:   "validation_error",
			Message: err.Error(),
		})
		return
	}

	mlResp, err := h.MLClient.Predict(req.Topic, req.Features)
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode(model.ErrorResponse{
			Error:   "ml_service_error",
			Message: err.Error(),
		})
		return
	}

	predStr := fmt.Sprintf("%v", mlResp.Prediction)

	resp := model.ClassifyResponse{
		Topic:           req.Topic,
		Prediction:      predStr, // From ML response, but label usually holds the readable version. We will just use prediction string here or label if preferred. We'll use label as the string prediction.
		Probability:     mlResp.Probability,
		InferenceTimeMs: mlResp.InferenceTimeMs,
	}
	if mlResp.Label != "" {
		resp.Prediction = mlResp.Label
	}

	json.NewEncoder(w).Encode(resp)
}
