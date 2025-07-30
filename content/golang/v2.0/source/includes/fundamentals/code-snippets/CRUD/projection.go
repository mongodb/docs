// Specifies which document fields to return
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
	Title      string `bson:"title,omitempty"`
	CourseId   string `bson:"course_id,omitempty"`
	Enrollment int32  `bson:"enrollment,omitempty"`
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

	// begin insertDocs
	coll := client.Database("db").Collection("courses")
	docs := []interface{}{
		Course{Title: "Primate Behavior", CourseId: "PSY2030", Enrollment: 40},
		Course{Title: "Revolution and Reform", CourseId: "HIST3080", Enrollment: 12},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nExclude Projection:\n")
	{
		// Creates an empty filter to match all documents
		//begin exclude projection
		filter := bson.D{}

		// Sets a projection to exclude the "course_id" and "enrollment" fields
		opts := options.Find().SetProjection(bson.D{{"course_id", 0}, {"enrollment", 0}})

		// Retrieves all documents and prints them as structs without
		// the specified fields
		cursor, err := coll.Find(context.TODO(), filter, opts)
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
		//end exclude projection
	}

	fmt.Println("\nInclude Projection:\n")
	{
		// Creates an empty filter to match all documents
		//begin include projection
		filter := bson.D{}

		// Sets a projection to include the "title" and "enrollment" fields
		opts := options.Find().SetProjection(bson.D{{"title", 1}, {"enrollment", 1}})

		// Retrieves all documents and prints them as structs including
		// only the specified fields
		cursor, err := coll.Find(context.TODO(), filter, opts)
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
		//end include projection
	}

	fmt.Println("\nAggregation Projection:\n")
	{
		// Creates a projection stage to include only the "title" and
		// "course_id" fields
		// begin aggregate projection
		projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"course_id", 1}}}}

		// Aggregates results and prints them as structs including
		// only the specified fields
		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{projectStage})
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
		// end aggregate projection
	}
}
