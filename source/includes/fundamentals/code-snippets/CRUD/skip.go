// Skips a specified amount of documents when returning results by using
// the Go driver
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
		Course{Title: "World Fiction", Enrollment: 35},
		Course{Title: "Abstract Algebra", Enrollment: 60},
		Course{Title: "Modern Poetry", Enrollment: 12},
		Course{Title: "Plate Tectonics", Enrollment: 45},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nSkip:\n")
	{
		// Prints all remaining documents as structs after applying an
		// ascending sort and omitting the first 2 documents
		//begin skip
		opts := options.Find().SetSort(bson.D{{"enrollment", 1}}).SetSkip(2)

		cursor, err := coll.Find(context.TODO(), bson.D{}, opts)

		var results []Course
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		//end skip
	}

	fmt.Println("Aggegation Skip:")
	{
		// Prints all remaining documents after using an aggregation
		// pipeline to apply a sort and omit the first document
		// begin aggregate skip
		sortStage := bson.D{{"$sort", bson.D{{"enrollment", -1}}}}
		skipStage := bson.D{{"$skip", 1}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{sortStage, skipStage})
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
		// end aggregate skip
	}
}
