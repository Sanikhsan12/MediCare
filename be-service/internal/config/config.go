package config

import (
	"os"
	"strconv"
)

type Config struct {
	Port             string
	MLServiceURL     string
	MLTimeoutSeconds int
	LogLevel         string
}

func LoadConfig() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mlServiceURL := os.Getenv("ML_SERVICE_URL")
	if mlServiceURL == "" {
		mlServiceURL = "http://ml-service:8000"
	}

	mlTimeoutStr := os.Getenv("ML_TIMEOUT_SECONDS")
	mlTimeout := 30
	if mlTimeoutStr != "" {
		if t, err := strconv.Atoi(mlTimeoutStr); err == nil {
			mlTimeout = t
		}
	}

	logLevel := os.Getenv("LOG_LEVEL")
	if logLevel == "" {
		logLevel = "info"
	}

	return &Config{
		Port:             port,
		MLServiceURL:     mlServiceURL,
		MLTimeoutSeconds: mlTimeout,
		LogLevel:         logLevel,
	}
}
