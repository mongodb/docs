// Opens a change stream to monitor data changes by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// begin struct
type Course struct {
	Title      string
	Enrollment int32
}

// end struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	client.Database("db").Collection("courses").Drop(context.TODO())

	// begin insertDocs
	coll := client.Database("db").Collection("courses")
	docs := []interface{}{
		Course{Title: "World Fiction", Enrollment: 35},
		Course{Title: "Abstract Algebra", Enrollment: 60},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nOpen Change Stream:\n")
	{
		// Opens a change stream to monitor changes to the "courses" collection
		// begin open stream
		changeStream, err := coll.Watch(context.TODO(), mongo.Pipeline{})
		if err != nil {
			panic(err)
		}
		defer changeStream.Close(context.TODO())

		// Iterates over the cursor to print the change stream events
		for changeStream.Next(context.TODO()) {
			fmt.Println(changeStream.Current)
		}
		// end open stream
	}

	fmt.Println("\nWatch for Delete Operations:\n")
	{
		// Opens a change stream to monitor delete operations on the "db" database
		// begin delete events
		db := client.Database("db")
		pipeline := bson.D{{"$match", bson.D{{"operationType", "delete"}}}}
		changeStream, err := db.Watch(context.TODO(), mongo.Pipeline{pipeline})
		if err != nil {
			panic(err)
		}
		defer changeStream.Close(context.TODO())

		// Iterates over the cursor to print the delete operation change events
		for changeStream.Next(context.TODO()) {
			fmt.Println(changeStream.Current)
		}
		// end delete events
	}

	fmt.Println("\nOutput Full Documents:\n")
	{
		// Opens a change stream that outputs complete modified documents
		// begin full document
		opts := options.ChangeStream().SetFullDocument(options.UpdateLookup)

		changeStream, err := coll.Watch(context.TODO(), mongo.Pipeline{}, opts)
		if err != nil {
			panic(err)
		}
		defer changeStream.Close(context.TODO())

		for changeStream.Next(context.TODO()) {
			fmt.Println(changeStream.Current)
		}
		// end full document
	}
}
