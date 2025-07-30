// Counts documents in a collection by using the Go driver
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

// start-tea-struct
type Tea struct {
	Type   string
	Rating int32
}

// end-tea-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
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

	// begin insert docs
	coll := client.Database("db").Collection("tea")
	docs := []interface{}{
		Tea{Type: "Masala", Rating: 10},
		Tea{Type: "Matcha", Rating: 7},
		Tea{Type: "Assam", Rating: 4},
		Tea{Type: "Oolong", Rating: 9},
		Tea{Type: "Chrysanthemum", Rating: 5},
		Tea{Type: "Earl Grey", Rating: 8},
		Tea{Type: "Jasmine", Rating: 3},
		Tea{Type: "English Breakfast", Rating: 6},
		Tea{Type: "White Peony", Rating: 4},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insert docs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	{
		// Counts documents that match a filter and prints the count
		// begin count documents
		filter := bson.D{{"rating", bson.D{{"$lt", 6}}}}

		count, err := coll.CountDocuments(context.TODO(), filter)
		if err != nil {
			panic(err)
		}
		fmt.Printf("Number of documents with a rating less than six: %d\n", count)
		// end count documents
	}

	{
		// Estimates the total number of documents in a collection and
		// prints the count
		// begin est doc count
		count, err := coll.EstimatedDocumentCount(context.TODO())
		if err != nil {
			panic(err)
		}
		fmt.Printf("Estimated number of documents in the tea collection: %d\n", count)
		// end est doc count
	}

	{
		// Uses an aggregation pipeline to count the documents in a
		// collection that match the criteria
		// begin aggregate count
		matchStage := bson.D{{"$match", bson.D{{"rating", bson.D{{"$gt", 5}}}}}}
		countStage := bson.D{{"$count", "total_documents"}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, countStage})
		if err != nil {
			panic(err)
		}

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		// end aggregate count
	}
}
