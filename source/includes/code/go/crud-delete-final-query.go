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

	// delete code goes here
	filter := bson.D{
		{"$and",
			bson.A{
				bson.D{{"OrbitalPeriod", bson.D{{"$gt", 5}}}},
				bson.D{{"OrbitalPeriod", bson.D{{"$lt", 85}}}},
			},
		},
	}

	result, err := coll.DeleteMany(context.TODO(), filter)
	if err != nil {
		panic(err)
	}

	// amount deleted code goes here
	fmt.Println(result.DeletedCount)
}
