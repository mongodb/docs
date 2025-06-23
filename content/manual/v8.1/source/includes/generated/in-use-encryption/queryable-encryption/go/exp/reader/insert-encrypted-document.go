package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func Insert() error {

	// start-key-vault
	keyVaultColl := "__keyVault"
	keyVaultDb := "encryption"
	keyVaultNamespace := keyVaultDb + "." + keyVaultColl
	dbName := "medicalRecords"
	collName := "patients"
	// end-key-vault

	// start-kmsproviders
	key, err := ioutil.ReadFile("master-key.txt")
	if err != nil {
		log.Fatalf("Could not read the key from master-key.txt: %v", err)
	}
	kmsProviders := map[string]map[string]interface{}{"local": {"key": key}}
	// end-kmsproviders

	// start-retrieve-deks
	uri := "<Your MongoDB URI>"
	regularClient, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(fmt.Errorf("Client connect error %v", err))
	}
	var foundDoc1 bson.M
	err = regularClient.Database(keyVaultDb).Collection(keyVaultColl).FindOne(context.TODO(), bson.D{{"keyAltNames", "demoDataKey1"}}).Decode(&foundDoc1)
	if err != nil {
		panic(err)
	}
	var dataKeyID1 = foundDoc1["_id"].(bson.Binary)
	var foundDoc2 bson.M
	err = regularClient.Database(keyVaultDb).Collection(keyVaultColl).FindOne(context.TODO(), bson.D{{"keyAltNames", "demoDataKey2"}}).Decode(&foundDoc2)
	if err != nil {
		panic(err)
	}
	var dataKeyID2 = foundDoc2["_id"].(bson.Binary)
	// end-retrieve-deks

	// start-extra-options
	extraOptions := map[string]interface{}{
		"cryptSharedLibPath": "<path to crypt_shared library>",
	}
	// end-extra-options

	// start-client
	autoEncryptionOpts := options.AutoEncryption().
		SetKmsProviders(kmsProviders).
		SetKeyVaultNamespace(keyVaultNamespace).
		SetExtraOptions(extraOptions).
		SetBypassQueryAnalysis(true)
	secureClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri).SetAutoEncryptionOptions(autoEncryptionOpts))
	if err != nil {
		return fmt.Errorf("Connect error for encrypted client: %v", err)
	}
	defer func() {
		_ = secureClient.Disconnect(context.TODO())
	}()
	var coll = secureClient.Database(dbName).Collection(collName)
	// end-client

	// start-client-enc
	clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(keyVaultNamespace).SetKmsProviders(kmsProviders)
	clientEnc, err := mongo.NewClientEncryption(regularClient, clientEncryptionOpts)
	if err != nil {
		panic(fmt.Errorf("NewClientEncryption error %v", err))
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()
	// end-client-enc

	// start-insert
	patientIdRawValueType, patientIdRawValueData, err := bson.MarshalValue(12345678)
	if err != nil {
		panic(err)
	}
	patientIdRawValue := bson.RawValue{Type: patientIdRawValueType, Value: patientIdRawValueData}
	patientIdEncryptionOpts := options.Encrypt().
		SetAlgorithm("Indexed").
		SetKeyID(dataKeyID1).
		SetContentionFactor(8)
	patientIdEncryptedField, err := clientEnc.Encrypt(
		context.TODO(),
		patientIdRawValue,
		patientIdEncryptionOpts)
	if err != nil {
		panic(err)
	}
	medicationsRawValueType, medicationsRawValueData, err := bson.MarshalValue([]string{"Atorvastatin", "Levothyroxine"})
	if err != nil {
		panic(err)
	}
	medicationsRawValue := bson.RawValue{Type: medicationsRawValueType, Value: medicationsRawValueData}
	medicationsEncryptionOpts := options.Encrypt().
		SetAlgorithm("Unindexed").
		SetKeyID(dataKeyID2)
	medicationsEncryptedField, err := clientEnc.Encrypt(
		context.TODO(),
		medicationsRawValue,
		medicationsEncryptionOpts)
	if err != nil {
		panic(err)
	}
	_, err = coll.InsertOne(
		context.TODO(),
		bson.D{{"firstName", "Jon"}, {"patientId", patientIdEncryptedField}, {"medications", medicationsEncryptedField}})
	if err != nil {
		panic(err)
	}
	// end-insert

	// start-find
	findPayloadRawValueType, findPayloadRawValueData, err := bson.MarshalValue(12345678)
	if err != nil {
		panic(err)
	}
	findPayloadRawValue := bson.RawValue{Type: findPayloadRawValueType, Value: findPayloadRawValueData}
	findPayloadEncryptionOpts := options.Encrypt().
		SetAlgorithm("Indexed").
		SetKeyID(dataKeyID1).
		SetQueryType("equality").
		SetContentionFactor(8)
	findPayloadEncryptedField, err := clientEnc.Encrypt(
		context.TODO(),
		findPayloadRawValue,
		findPayloadEncryptionOpts)
	if err != nil {
		panic(err)
	}
	var resultSecure bson.M
	coll.FindOne(context.TODO(), bson.D{{"firstName", findPayloadEncryptedField}}).Decode(&resultSecure)
	if err != nil {
		panic(err)
	}
	outputSecure, err := json.MarshalIndent(resultSecure, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("\nFound document searching on explicitly encrypted field:\n%s\n", outputSecure)
	// end-find
	return nil
}
