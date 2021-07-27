package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Replace the uri string with your MongoDB deployment's connection string.
	uri := "mongodb+srv://<username>:<password>@<cluster-address>/test?w=majority"

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin find
	myCollection := client.Database("sample_training").Collection("zips")
	filter := bson.D{{"pop", bson.D{{"$lte", 500}}}}

	cursor, err := myCollection.Find(context.TODO(), filter)
	// end find

	if err != nil {
		log.Fatal(err)
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}

}
