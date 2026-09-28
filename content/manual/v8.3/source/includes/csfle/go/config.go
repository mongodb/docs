// Shared configuration for CSFLE example files.
package main

import (
	"fmt"
	"os"
)

// MongoDB connection string
const connectionString = "<connection string>"

// Database that contains the key vault collection
const keyVaultDb = "encryption"

// Collection that stores your data encryption keys
const keyVaultColl = "__keyVault"

// Namespace that stores your data encryption keys
const keyVaultNamespace = keyVaultDb + "." + keyVaultColl

// File path for your local Customer Master Key
const masterKeyPath = "master-key.txt"

// File path for your data encryption key
const dekIdPath = "dek_id.txt"

// Shared library path for CSFLE
const cryptSharedLibPath = "<Automatic Encryption Shared Library path>"

// getKmsProviders loads and returns KMS providers with the local master key.
func getKmsProviders() (map[string]map[string]any, error) {
	key, err := os.ReadFile(masterKeyPath)
	if err != nil {
		return nil, fmt.Errorf("could not read master key: %v", err)
	}
	return map[string]map[string]any{"local": {"key": key}}, nil
}
