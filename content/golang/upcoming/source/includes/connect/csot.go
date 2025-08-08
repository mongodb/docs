package main

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {

	// start-client-opts
	opts := options.Client().SetTimeout(200 * time.Millisecond)
	client, err := mongo.Connect(opts)
	// end-client-opts

	if err != nil {
		log.Fatal(err)
	}

	// start-override
	opts = options.Client().SetTimeout(200 * time.Millisecond)
	client, err = mongo.Connect(opts)
	if err != nil {
		log.Fatal(err)
	}

	coll := client.Database("db").Collection("people")

	ctx, cancel := context.WithTimeout(context.TODO(), 300*time.Millisecond)
	defer cancel()

	_, err = coll.InsertOne(ctx, bson.D{{"name", "Agnes Georgiou"}})
	// end-override

	session, err := client.StartSession()
	if err != nil {
		log.Fatal(err)
	}
	defer session.EndSession(context.TODO())

	// start-txn-context
	txnContext, cancel := context.WithTimeout(context.TODO(), 300*time.Millisecond)
	defer cancel()

	result, err := session.WithTransaction(txnContext, func(ctx context.Context) (string, error) {
		// Perform transaction operations
	})
	// end-txn-context

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()
}
