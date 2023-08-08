package main

import (
	"context"
	"encoding/json"
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
	Enrollment int32
}

// end-course-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
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
		//begin skip
		opts := options.Find().SetSort(bson.D{{"enrollment", 1}}).SetSkip(2)

		cursor, err := coll.Find(context.TODO(), bson.D{}, opts)

		var results []Course
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
		//end skip
	}

	fmt.Println("Aggegation Skip:")
	{
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
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
		// end aggregate skip
	}
}
