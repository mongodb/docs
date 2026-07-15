package main

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func MakeKey() error {
	// start-generate-cmk
	key := make([]byte, 96)
	if _, err := rand.Read(key); err != nil {
		return fmt.Errorf("could not generate random key: %v", err)
	}
	if err := os.WriteFile(masterKeyPath, key, 0644); err != nil {
		return fmt.Errorf("could not write master key to file: %v", err)
	}
	// end-generate-cmk

	// start-create-index
	keyVaultClient, err := mongo.Connect(options.Client().ApplyURI(connectionString))
	if err != nil {
		return fmt.Errorf("connect error for key vault client: %v", err)
	}
	defer func() {
		_ = keyVaultClient.Disconnect(context.TODO())
	}()

	// Drops the key vault collection and database if they already exist
	if err = keyVaultClient.Database(keyVaultDb).Collection(keyVaultColl).Drop(context.TODO()); err != nil {
		return fmt.Errorf("collection drop error: %v", err)
	}
	if err = keyVaultClient.Database("medicalRecords").Collection("patients").Drop(context.TODO()); err != nil {
		return fmt.Errorf("collection drop error: %v", err)
	}
	keyVaultIndex := mongo.IndexModel{
		Keys: bson.D{{Key: "keyAltNames", Value: 1}},
		Options: options.Index().
			SetUnique(true).
			SetPartialFilterExpression(bson.D{
				{Key: "keyAltNames", Value: bson.D{
					{Key: "$exists", Value: true},
				}},
			}),
	}
	_, err = keyVaultClient.Database(keyVaultDb).Collection(keyVaultColl).Indexes().CreateOne(context.TODO(), keyVaultIndex)
	if err != nil {
		return fmt.Errorf("index create error: %v", err)
	}
	// end-create-index

	// start-create-data-key
	kmsProviders, err := getKmsProviders()
	if err != nil {
		return err
	}
	clientEncryptionOpts := options.ClientEncryption().
		SetKeyVaultNamespace(keyVaultNamespace).
		SetKmsProviders(kmsProviders)
	clientEnc, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
	if err != nil {
		return fmt.Errorf("NewClientEncryption error: %v", err)
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()

	dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), "local", options.DataKey())
	if err != nil {
		return fmt.Errorf("create data key error: %v", err)
	}

	base64DekId := base64.StdEncoding.EncodeToString(dataKeyID.Data)
	fmt.Printf("DataKeyId [base64]: %s\n", base64DekId)
	// Writes the key ID to a file for use by other files
	if err := os.WriteFile(dekIdPath, []byte(base64DekId), 0644); err != nil {
		return fmt.Errorf("write dek_id.txt error: %v", err)
	}
	// end-create-data-key

	return nil
}
