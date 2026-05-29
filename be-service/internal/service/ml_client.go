package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"be-service/internal/model"
)

type MLClient struct {
	BaseURL    string
	HTTPClient *http.Client
}

func NewMLClient(baseURL string, timeoutSeconds int) *MLClient {
	return &MLClient{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: time.Duration(timeoutSeconds) * time.Second,
		},
	}
}

func (c *MLClient) Predict(topic string, features map[string]interface{}) (*model.MLResponse, error) {
	url := fmt.Sprintf("%s/predict/%s", c.BaseURL, topic)

	reqBody := model.MLRequest{
		Features: features,
	}

	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal ml request: %v", err)
	}

	resp, err := c.HTTPClient.Post(url, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, fmt.Errorf("ml service is not reachable or timed out: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp model.ErrorResponse
		json.NewDecoder(resp.Body).Decode(&errResp)
		return nil, fmt.Errorf("ml service returned an error (%d): %s", resp.StatusCode, errResp.Message)
	}

	var mlResp model.MLResponse
	if err := json.NewDecoder(resp.Body).Decode(&mlResp); err != nil {
		return nil, fmt.Errorf("failed to decode ml response: %v", err)
	}

	return &mlResp, nil
}
