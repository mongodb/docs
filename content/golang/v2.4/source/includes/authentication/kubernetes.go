package main

import (
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// start-kubernetes
	uri := "mongodb://<hostname>:<port>"
	props := map[string]string{
		"ENVIRONMENT": "k8s",
	}
	opts := options.Client().ApplyURI(uri)
	opts.SetAuth(
		options.Credential{
			AuthMechanism:           "MONGODB-OIDC",
			AuthMechanismProperties: props,
		},
	)
	client, err := mongo.Connect(opts)
	if err != nil {
		panic(err)
	}
	// end-kubernetes
}
