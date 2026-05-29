package validator

import (
	"errors"
	"fmt"
	"be-service/internal/model"
)

var requiredFields = map[string][]string{
	"diabetes":      {"pregnancies", "glucose", "blood_pressure", "skin_thickness", "insulin", "bmi", "diabetes_pedigree", "age"},
	"heart_disease": {"age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"},
	"breast_cancer": {"radius_mean", "texture_mean", "perimeter_mean", "area_mean", "smoothness_mean", "compactness_mean", "concavity_mean", "concave_points_mean", "symmetry_mean", "fractal_dimension_mean"},
	"obesity":       {"gender", "age", "height", "weight", "family_history", "favc", "fcvc", "ncp", "caec", "smoke", "ch2o", "scc", "faf", "tue", "calc", "mtrans"},
	"banknote":      {"variance", "skewness", "curtosis", "entropy"},
}

func ValidateClassifyRequest(req *model.ClassifyRequest) error {
	if req.Topic == "" {
		return errors.New("field 'topic' is required")
	}

	fields, ok := requiredFields[req.Topic]
	if !ok {
		return fmt.Errorf("topic '%s' is not supported. valid topics: diabetes, heart_disease, breast_cancer, obesity, banknote", req.Topic)
	}

	if req.Features == nil || len(req.Features) == 0 {
		return errors.New("field 'features' is required")
	}

	for _, field := range fields {
		if val, exists := req.Features[field]; !exists || val == nil {
			return fmt.Errorf("field '%s' is required", field)
		}
	}

	return nil
}
