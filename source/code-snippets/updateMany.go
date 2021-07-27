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

	// begin updatemany
	myCollection := client.Database("sample_airbnb").Collection("listingsAndReviews")
	filter := bson.D{{"address.market", "Sydney"}}
	update := bson.D{{"$mul", bson.D{{"price", 1.15}}}}

	result, err := myCollection.UpdateMany(context.TODO(), filter, update)
	// end updatemany

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%v documents were updated.\n", result.ModifiedCount)

}
