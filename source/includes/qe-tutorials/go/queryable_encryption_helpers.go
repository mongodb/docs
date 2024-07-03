package main

import (
	"crypto/tls"
	"errors"
	"fmt"
	"os"

	"crypto/rand"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func LoadEnv() {
	err := godotenv.Load(".env") // This file should contain your KMS credentials
	if err != nil {
		panic("Error loading .env file")
	}
}

func GetKmsProviderCredentials(kmsProviderName string) map[string]map[string]interface{} {

	switch kmsProviderName {
	case "aws":
		// start-aws-kms-credentials
		kmsProviderCredentials := map[string]map[string]interface{}{
			"aws": {
				"accessKeyId":     os.Getenv("AWS_ACCESS_KEY_ID"),     // AWS access key ID
				"secretAccessKey": os.Getenv("AWS_SECRET_ACCESS_KEY"), // AWS secret access key
			},
		}
		// end-aws-kms-credentials
		return kmsProviderCredentials
	case "azure":
		// start-azure-kms-credentials
		kmsProviderCredentials := map[string]map[string]interface{}{
			"azure": {
				"tenantId":     os.Getenv("AZURE_TENANT_ID"),     // Azure tenant ID
				"clientId":     os.Getenv("AZURE_CLIENT_ID"),     // Azure client ID
				"clientSecret": os.Getenv("AZURE_CLIENT_SECRET"), // Azure client secret
			},
		}
		// end-azure-kms-credentials
		return kmsProviderCredentials
	case "gcp":
		// start-gcp-kms-credentials
		kmsProviderCredentials := map[string]map[string]interface{}{
			"gcp": {
				"email":      os.Getenv("GCP_EMAIL"),       // GCP email
				"privateKey": os.Getenv("GCP_PRIVATE_KEY"), // GCP private key
			},
		}
		// end-gcp-kms-credentials
		return kmsProviderCredentials
	case "kmip":
		// start-kmip-kms-credentials
		kmsProviderCredentials := map[string]map[string]interface{}{
			"kmip": {
				"endpoint": os.Getenv("KMIP_KMS_ENDPOINT"), // KMIP KMS endpoint
			},
		}
		// end-kmip-kms-credentials
		return kmsProviderCredentials
	case "local":

		// Reuse the key from the customer-master-key.txt file if it exists
		if _, err := os.Stat("./customer-master-key.txt"); errors.Is(err, os.ErrNotExist) {
			// start-generate-local-key
			key := make([]byte, 96)
			if _, err := rand.Read(key); err != nil {
				panic(fmt.Sprintf("Unable to create a random 96 byte data key: %v\n", err))
			}
			if err := os.WriteFile("customer-master-key.txt", key, 0644); err != nil {
				panic(fmt.Sprintf("Unable to write key to file: %v\n", err))
			}
			// end-generate-local-key

		}

		// start-get-local-key
		key, err := os.ReadFile("customer-master-key.txt")
		if err != nil {
			panic(fmt.Sprintf("Could not read the Customer Master Key: %v", err))
		}
		if len(key) != 96 {
			panic(fmt.Sprintf("Expected the customer master key file to be 96 bytes."))
		}
		kmsProviderCredentials := map[string]map[string]interface{}{"local": {"key": key}}
		// end-get-local-key
		return kmsProviderCredentials

	default:
		panic(fmt.Sprintf("Unrecognized value for kmsProviderName encountered while retrieving KMS credentials.: %s\n", kmsProviderName))
	}
}

func GetCustomerMasterKeyCredentials(kmsProviderName string) map[string]string {
	switch kmsProviderName {
	case "aws":
		// start-aws-cmk-credentials
		customerMasterKeyCredentials := map[string]string{
			"key":    os.Getenv("AWS_KEY_ARN"),    // Your AWS Key ARN
			"region": os.Getenv("AWS_KEY_REGION"), // Your AWS Key Region
		}
		// end-aws-cmk-credentials
		return customerMasterKeyCredentials
	case "azure":
		// start-azure-cmk-credentials
		customerMasterKeyCredentials := map[string]string{
			"keyVaultEndpoint": os.Getenv("AZURE_KEY_VAULT_ENDPOINT"), // Your Azure Key Vault Endpoint
			"keyName":          os.Getenv("AZURE_KEY_NAME"),           // Your Azure Key Name
		}
		// end-azure-cmk-credentials
		return customerMasterKeyCredentials
	case "gcp":
		// start-gcp-cmk-credentials
		customerMasterKeyCredentials := map[string]string{
			"projectId": os.Getenv("GCP_PROJECT_ID"), // Your GCP Project ID
			"location":  os.Getenv("GCP_LOCATION"),   // Your GCP Key Location
			"keyRing":   os.Getenv("GCP_KEY_RING"),   // Your GCP Key Ring
			"keyName":   os.Getenv("GCP_KEY_NAME"),   // Your GCP Key Name
		}
		// end-gcp-cmk-credentials
		return customerMasterKeyCredentials
	case "kmip", "local":
		// start-kmip-local-cmk-credentials
		cmkCredentials := map[string]string{}
		// end-kmip-local-cmk-credentials
		return cmkCredentials
	default:
		panic(fmt.Sprintf("Unrecognized value for kmsProviderName encountered while retrieving Customer Master Key credentials: %s\n", kmsProviderName))
	}
}

func GetClientEncryption(
	encryptedClient *mongo.Client,
	kmsProviderName string,
	kmsProviderCredentials map[string]map[string]interface{},
	keyVaultNamespace string,
) *mongo.ClientEncryption {

	if kmsProviderName == "kmip" {
		tlsConfig := GetKmipTlsOptions()

		// start-kmip-client-encryption
		opts := options.ClientEncryption().
			SetKeyVaultNamespace(keyVaultNamespace).
			SetKmsProviders(kmsProviderCredentials).
			SetTLSConfig(tlsConfig)

		clientEncryption, err := mongo.NewClientEncryption(encryptedClient, opts)
		if err != nil {
			panic(fmt.Sprintf("Unable to create a ClientEncryption instance due to the following error: %s\n", err))
		}
		// end-kmip-client-encryption
		return clientEncryption
	}

	// start-client-encryption
	opts := options.ClientEncryption().
		SetKeyVaultNamespace(keyVaultNamespace).
		SetKmsProviders(kmsProviderCredentials)

	clientEncryption, err := mongo.NewClientEncryption(encryptedClient, opts)
	if err != nil {
		panic(fmt.Sprintf("Unable to create a ClientEncryption instance due to the following error: %s\n", err))
	}
	// end-client-encryption
	return clientEncryption
}

func GetKmipTlsOptions() map[string]*tls.Config {
	// start-tls-options
	tlsOpts := map[string]interface{}{
		"tlsCertificateKeyFile": os.Getenv("KMIP_TLS_CERT_ECDSA_FILE"), // Path to your client certificate file
		"tlsCAFile":             os.Getenv("KMIP_TLS_CA_ECDSA_FILE"),   // Path to your KMIP certificate authority file
	}
	kmipConfig, err := options.BuildTLSConfig(tlsOpts)
	if err != nil {
		panic(fmt.Sprintf("Unable to retrieve certificates from your environment: %s\n", err))
	}
	tlsConfig := map[string]*tls.Config{
		"kmip": kmipConfig,
	}
	// end-tls-options
	return tlsConfig
}

func GetAutoEncryptionOptions(
	kmsProviderName string,
	keyVaultNamespace string,
	kmsProviderCredentials map[string]map[string]interface{},
) *options.AutoEncryptionOptions {

	if kmsProviderName == "kmip" {
		tlsConfig := GetKmipTlsOptions()

		// start-kmip-encryption-options
		cryptSharedLibraryPath := map[string]interface{}{
			"cryptSharedLibPath": os.Getenv("SHARED_LIB_PATH"), // Path to your Automatic Encryption Shared Library
		}

		autoEncryptionOptions := options.AutoEncryption().
			SetKeyVaultNamespace(keyVaultNamespace).
			SetKmsProviders(kmsProviderCredentials).
			SetExtraOptions(cryptSharedLibraryPath).
			SetTLSConfig(tlsConfig)
		// end-kmip-encryption-options
		return autoEncryptionOptions
	} else {
		// start-auto-encryption-options
		cryptSharedLibraryPath := map[string]interface{}{
			"cryptSharedLibPath": os.Getenv("SHARED_LIB_PATH"), // Path to your Automatic Encryption Shared Library
		}

		autoEncryptionOptions := options.AutoEncryption().
			SetKeyVaultNamespace(keyVaultNamespace).
			SetKmsProviders(kmsProviderCredentials).
			SetExtraOptions(cryptSharedLibraryPath)
		// end-auto-encryption-options
		return autoEncryptionOptions
	}
}
