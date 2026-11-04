ctx := context.Background()

uri := os.Getenv("MONGODB_URI")
if uri == "" {
	log.Fatal("Set your 'MONGODB_URI' environment variable")
}

keyVaultClient, err := mongo.Connect(options.Client().ApplyURI(uri))
if err != nil {
	log.Fatalf("failed to connect to the server: %v", err)
}
defer func() { _ = keyVaultClient.Disconnect(ctx) }()

clientEncryptionOpts := options.ClientEncryption().
	SetKeyVaultNamespace(keyVaultNamespace).
	SetKmsProviders(kmsProviders)
clientEncryption, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
if err != nil {
	log.Fatalf("failed to create ClientEncryption: %v", err)
}
defer func() { _ = clientEncryption.Close(ctx) }()

filter := bson.D{{Key: "<filter field>", Value: "<filter value>"}}

masterKey := bson.D{{Key: "<dataKeyOpts Key>", Value: "<dataKeyOpts Value>"}}
rewrapOpts := options.RewrapManyDataKey().
	SetProvider("<KMS provider>").
	SetMasterKey(masterKey)

result, err := clientEncryption.RewrapManyDataKey(ctx, filter, rewrapOpts)
if err != nil {
	log.Fatalf("failed to rewrap data keys: %v", err)
}
