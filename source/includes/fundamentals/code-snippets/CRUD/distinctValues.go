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

// start-course-struct
type Course struct {
	Title      string
	Department string
	Enrollment int32
}

// end-course-struct

func main() {
	var uri string
	if uri = os.Getenv("DRIVER_REF_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
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

	// begin insert docs
	coll := client.Database("db").Collection("courses")
	docs := []interface{}{
		Course{Title: "World Fiction", Department: "English", Enrollment: 35},
		Course{Title: "Abstract Algebra", Department: "Mathematics", Enrollment: 60},
		Course{Title: "Modern Poetry", Department: "English", Enrollment: 12},
		Course{Title: "Plate Tectonics", Department: "Earth Science", Enrollment: 30},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insert docs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	// begin distinct
	results, err := coll.Distinct(context.TODO(), "department", bson.D{{"enrollment", bson.D{{"$lt", 50}}}})
	if err != nil {
		panic(err)
	}

	for _, result := range results {
		fmt.Println(result)
	}
	// end distinct
}
