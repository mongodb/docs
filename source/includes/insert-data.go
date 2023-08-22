package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Define structure of documents in the people collection
type Person struct {
	Name     Name
	Birth    time.Time
	Death    time.Time
	Contribs []string
	Views    int
}

type Name struct {
	First string
	Last  string
}

func main() {

	// Replace the following with your Atlas connection string
	uri := "<connection-string>"

	// Connect to your Atlas cluster
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// Reference the database and collection to use
	collection := client.Database("gettingStarted").Collection("people")

	// Create a new document
	newPerson := Person{
		Name:     Name{First: "Alan", Last: "Turing"},
		Birth:    time.Date(1912, 5, 23, 0, 0, 0, 0, time.UTC), // May 23, 1912
		Death:    time.Date(1954, 5, 7, 0, 0, 0, 0, time.UTC),  // May 7, 1954
		Contribs: []string{"Turing machine", "Turing test", "Turingery"},
		Views:    1250000,
	}

	// Insert the document into the specified collection
	collection.InsertOne(context.TODO(), newPerson)

	// Find and return the document
	collection = client.Database("gettingStarted").Collection("people")
	filter := bson.D{{"name.last", "Turing"}}

	var result Person
	err = collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		panic(err)
	}
	fmt.Printf("Document Found:\n%+v\n", result)
}
