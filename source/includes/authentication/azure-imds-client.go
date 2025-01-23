package main

import (
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// start-azure-imds-client
	uri := "mongodb://<hostname>:<port>"
	props := map[string]string{
		"ENVIRONMENT":    "azure",
		"TOKEN_RESOURCE": "<audience>",
	}
	opts := options.Client().ApplyURI(uri)
	opts.SetAuth(
		options.Credential{
			Username:                "<Azure client ID or application ID>",
			AuthMechanism:           "MONGODB-OIDC",
			AuthMechanismProperties: props,
		},
	)
	client, err := mongo.Connect(opts)
	if err != nil {
		panic(err)
	}
	// end-azure-imds-client
}
