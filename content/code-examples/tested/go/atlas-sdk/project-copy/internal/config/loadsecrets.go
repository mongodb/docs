package config

import (
	"errors"
	"fmt"
	"os"
)

const (
	envServiceAccountID     = "MONGODB_ATLAS_SERVICE_ACCOUNT_ID"
	envServiceAccountSecret = "MONGODB_ATLAS_SERVICE_ACCOUNT_SECRET"
)

var errMissingEnv = errors.New("missing environment variable")

// Secrets contains sensitive configuration loaded from environment variables
type Secrets struct {
	serviceAccountID     string
	serviceAccountSecret string
}

func (s Secrets) ServiceAccountID() string {
	return s.serviceAccountID
}

func (s Secrets) ServiceAccountSecret() string {
	return s.serviceAccountSecret
}

// LoadSecrets loads sensitive configuration from environment variables
// Returns error if any required environment variable is missing
func LoadSecrets() (Secrets, error) {
	s := Secrets{}
	var missing []string

	look := func(key string, dest *string) {
		if v, ok := os.LookupEnv(key); ok && v != "" {
			*dest = v
		} else {
			missing = append(missing, key)
		}
	}

	look(envServiceAccountID, &s.serviceAccountID)
	look(envServiceAccountSecret, &s.serviceAccountSecret)

	if len(missing) > 0 {
		return Secrets{}, fmt.Errorf("load secrets: %w (missing: %v)", errMissingEnv, missing)
	}
	return s, nil
}

