package config

import (
	"os"
	"strings"

	"atlas-sdk-examples/internal/errors"
)

const defaultConfigPath = "configs/config.json" // Default path if not specified in environment

// LoadAll loads secrets from .env and configuration from the specified config file.
// If the configPath is empty, it falls back to the default config path.
// It returns both Secrets and Config, or an error if either loading fails.
func LoadAll(configPath string) (Secrets, Config, error) {
	if strings.TrimSpace(configPath) == "" {
		configPath = defaultConfigPath
	}

	if _, statErr := os.Stat(configPath); os.IsNotExist(statErr) {
		return Secrets{}, Config{}, &errors.NotFoundError{Resource: "configuration file", ID: configPath}
	}

	secrets, err := LoadSecrets()
	if err != nil {
		return Secrets{}, Config{}, errors.WithContext(err, "loading secrets")
	}
	cfg, err := LoadConfig(configPath)
	if err != nil {
		return Secrets{}, Config{}, errors.WithContext(err, "loading config")
	}
	return secrets, cfg, nil
}

// LoadAllFromEnv resolves the configuration path from the CONFIG_PATH environment variable
// and delegates to LoadAll. If CONFIG_PATH is empty, LoadAll will apply its default path.
func LoadAllFromEnv() (Secrets, Config, error) {
	configPath := os.Getenv("CONFIG_PATH")
	return LoadAll(configPath)
}
