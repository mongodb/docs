package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Defines structure of documents in the people collection
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

	// Connects to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// References the database and collection to use
	collection := client.Database("gettingStarted").Collection("people")

	// Creates new documents
	newPeople := []interface{}{
		Person{
			Name:     Name{First: "Alan", Last: "Turing"},
			Birth:    time.Date(1912, 5, 23, 0, 0, 0, 0, time.UTC), // May 23, 1912
			Death:    time.Date(1954, 5, 7, 0, 0, 0, 0, time.UTC),  // May 7, 1954
			Contribs: []string{"Turing machine", "Turing test", "Turingery"},
			Views:    1250000,
		},
		Person{
			Name:     Name{First: "Grace", Last: "Hopper"},
			Birth:    time.Date(1906, 12, 9, 0, 0, 0, 0, time.UTC), // Dec 9, 1906
			Death:    time.Date(1992, 1, 1, 0, 0, 0, 0, time.UTC),  // Jan 1, 1992
			Contribs: []string{"Mark I", "UNIVAC", "COBOL"},
			Views:    3860000,
		},
	}

	// Inserts the document into the specified collection
	collection.InsertMany(context.TODO(), newPeople)

	// Finds the document
	collection = client.Database("gettingStarted").Collection("people")
	filter := bson.D{{Key: "name.last", Value: "Turing"}}

	var result Person
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		panic(err)
	}

	// Prints results
	fmt.Printf("Document Found:\n%+v\n", result)
}
