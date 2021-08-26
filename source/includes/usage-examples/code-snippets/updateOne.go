package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://docs.mongodb.com/drivers/go/current/usage-examples/")
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

	// begin updateone
	myCollection := client.Database("sample_restaurants").Collection("restaurants")
	id, _ := primitive.ObjectIDFromHex("5eb3d668b31de5d588f42a7a")
	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"avg_rating", 4.4}}}}

	result, err := myCollection.UpdateOne(context.TODO(), filter, update)
	// end updateone

	if err != nil {
		panic(err)
	}

	fmt.Printf("Documents updated: %v\n", result.ModifiedCount)
}
