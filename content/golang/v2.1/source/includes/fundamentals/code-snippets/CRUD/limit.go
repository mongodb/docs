// Limits the number of documents returned by a query
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

// start-course-struct
type Course struct {
	Title      string
	Enrollment int32
}

// end-course-struct

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

	// begin insertDocs
	coll := client.Database("db").Collection("courses")
	docs := []interface{}{
		Course{Title: "Romantic Era Music", Enrollment: 15},
		Course{Title: "Concepts in Topology", Enrollment: 35},
		Course{Title: "Ancient Greece", Enrollment: 100},
		Course{Title: "Physiology I", Enrollment: 60},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nLimit:\n")
	{
		// Creates a filter to match documents that have an
		// "enrollment" value greater than 20
		//begin limit
		filter := bson.D{{"enrollment", bson.D{{"$gt", 20}}}}

		// Sets a limit to return the first 2 matched documents
		opts := options.Find().SetLimit(2)

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter, opts)

		var results []Course
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		//end limit
	}

	fmt.Println("\nLimit, Skip, and Sort:\n")
	{
		// Creates an empty filter to match all documents
		//begin multi options
		filter := bson.D{}

		// Sets options to sort by descending order on "enrollment",
		// return only 2 documents, and skip the first matched document
		opts := options.Find().SetSort(bson.D{{"enrollment", -1}}).SetLimit(2).SetSkip(1)

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter, opts)

		var results []Course
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		//end multi options
	}

	fmt.Println("\nAggregation Limit:\n")
	{
		// Creates a limit stage to return 3 documents
		// begin aggregate limit
		limitStage := bson.D{{"$limit", 3}}

		// Aggregates results and prints them as structs
		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{limitStage})
		if err != nil {
			panic(err)
		}

		var results []Course
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		// end aggregate limit
	}
}
