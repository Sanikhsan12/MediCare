package main

import (
	"log"
	"net/http"
	"fmt"

	"be-service/internal/config"
	"be-service/internal/handler"
	"be-service/internal/middleware"
	"be-service/internal/service"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()
	
	cfg := config.LoadConfig()

	mlClient := service.NewMLClient(cfg.MLServiceURL, cfg.MLTimeoutSeconds)
	
	healthHandler := handler.NewHealthHandler()
	classifyHandler := handler.NewClassifyHandler(mlClient)

	r := chi.NewRouter()
	
	r.Use(middleware.Logger)
	r.Use(middleware.CORS)

	r.Get("/health", healthHandler.Check)
	r.Post("/api/classify", classifyHandler.Handle)

	log.Printf("Starting BE Service on port %s...", cfg.Port)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
