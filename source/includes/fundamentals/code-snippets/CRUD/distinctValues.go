package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	var uri string
	if uri = os.Getenv("DRIVER_REF_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	client.Database("tea").Collection("ratings").Drop(context.TODO())

	// begin insert docs
	coll := client.Database("tea").Collection("ratings")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"rating", 10}},
		bson.D{{"type", "Matcha"}, {"rating", 7}},
		bson.D{{"type", "Masala"}, {"rating", 4}},
		bson.D{{"type", "Oolong"}, {"rating", 9}},
		bson.D{{"type", "Matcha"}, {"rating", 5}},
		bson.D{{"type", "Earl Grey"}, {"rating", 8}},
		bson.D{{"type", "Oolong"}, {"rating", 3}},
		bson.D{{"type", "Matcha"}, {"rating", 6}},
		bson.D{{"type", "Earl Grey"}, {"rating", 4}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	//end insert docs

	// begin distinct
	results, err := coll.Distinct(context.TODO(), "type", bson.D{})
	if err != nil {
		panic(err)
	}

	for _, result := range results {
		fmt.Println(result)
	}
	// end distinct
}
