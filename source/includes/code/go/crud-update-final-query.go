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
	uri := "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
	
	// database and colletion code goes here
	db := client.Database("sample_guides")
	coll := db.Collection("comets")

	// update code goes here
	filter := bson.D{{}}
	update := bson.D{{"$mul", bson.D{{"Radius", 1.60934}}}}

	result, err := coll.UpdateMany(context.TODO(), filter, update)
	if err != nil {
		panic(err)
	}

	// amount update code goes here
	fmt.Println(result.ModifiedCount)
}
