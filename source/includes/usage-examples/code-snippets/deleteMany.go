package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://<username>:<password>@<cluster-address>/test?w=majority"

func main() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin deleteMany
	coll := client.Database("sample_mflix").Collection("movies")
	filter := bson.D{{"runtime", bson.D{{"$gt", 800}}}}

	results, err := coll.DeleteMany(context.TODO(), filter)
	// end deleteMany

	if err != nil {
		panic(err)
	}

	// When you run this file for the first time, it should print "Documents deleted: 4"
	fmt.Printf("Documents deleted: %d\n", results.DeletedCount)
}
