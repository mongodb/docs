// Finds distinct values of a document field by using the Go driver
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
	Department string
	Enrollment int32
}

// end-course-struct

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
	coll := client.Database("db").Collection("courses")
	docs := []interface{}{
		Course{Title: "World Fiction", Department: "English", Enrollment: 35},
		Course{Title: "Abstract Algebra", Department: "Mathematics", Enrollment: 60},
		Course{Title: "Modern Poetry", Department: "English", Enrollment: 12},
		Course{Title: "Plate Tectonics", Department: "Geology", Enrollment: 30},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insert docs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	// Retrieves and prints distinct values of the "department" field in
	// documents that match the filter
	// begin distinct
	filter := bson.D{{"enrollment", bson.D{{"$lt", 50}}}}

	var arr []string
	err = coll.Distinct(context.TODO(), "department", filter).Decode(&arr)
	if err != nil {
		panic(err)
	}

	fmt.Printf("%s\n", arr)
	// end distinct
}
