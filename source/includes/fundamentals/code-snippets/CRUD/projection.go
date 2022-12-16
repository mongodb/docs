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
	Title      string `bson:"title,omitempty"`
	CourseId   string `bson:"course_id,omitempty"`
	Enrollment int32  `bson:"enrollment,omitempty"`
}

// end-course-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
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
		//begin exclude projection
		filter := bson.D{}
		opts := options.Find().SetProjection(bson.D{{"course_id", 0}, {"enrollment", 0}})

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
		//begin include projection
		filter := bson.D{}
		opts := options.Find().SetProjection(bson.D{{"title", 1}, {"enrollment", 1}})

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
		// begin aggregate projection
		projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"course_id", 1}}}}

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
