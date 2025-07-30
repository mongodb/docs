// Performs compound operations to find and modify data by using the Go driver
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

	client.Database("db").Collection("courses").Drop(context.TODO())

	// begin insertDocs
	coll := client.Database("db").Collection("courses")
	docs := []interface{}{
		Course{Title: "Representation Theory", Enrollment: 40},
		Course{Title: "Early Modern Philosophy", Enrollment: 25},
		Course{Title: "Animal Communication", Enrollment: 18},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nFindOneAndDelete:\n")
	{
		// Creates a filter to match documents where the "enrollment"
		// value is less than 20
		//begin FindOneAndDelete
		filter := bson.D{{"enrollment", bson.D{{"$lt", 20}}}}

		// Finds and deletes the first matching document in one action
		var deletedDoc Course
		err := coll.FindOneAndDelete(context.TODO(), filter).Decode(&deletedDoc)
		if err != nil {
			panic(err)
		}

		// Prints the contents of the deleted document
		res, _ := bson.MarshalExtJSON(deletedDoc, false, false)
		fmt.Println(string(res))
		//end FindOneAndDelete
	}

	fmt.Println("\nFindOneAndUpdate:\n")
	{
		// Creates a filter to match documents where the "title"
		// value includes the string "Modern"
		//begin FindOneAndUpdate
		filter := bson.D{{"title", bson.D{{"$regex", "Modern"}}}}

		// Creates instructions to set the "enrollment" field to 32
		update := bson.D{{"$set", bson.D{{"enrollment", 32}}}}
		opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

		// Finds and updates the first matching document in one action
		var updatedDoc Course
		err := coll.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		// Prints the contents of the document after the update
		res, _ := bson.MarshalExtJSON(updatedDoc, false, false)
		fmt.Println(string(res))
		//end FindOneAndUpdate
	}

	fmt.Println("\nFindOneAndReplace:\n")
	{
		// Creates a filter to match documents where the "title"
		// value is "Representation Theory"
		//begin FindOneAndReplace
		filter := bson.D{{"title", "Representation Theory"}}

		// Creates a new document to replace the matched document
		replacement := Course{Title: "Combinatorial Theory", Enrollment: 35}

		// Finds and replaces the first matching document in one action
		var previousDoc Course
		err := coll.FindOneAndReplace(context.TODO(), filter, replacement).Decode(&previousDoc)
		if err != nil {
			panic(err)
		}

		// Prints the contents of the document before the replacement
		res, _ := bson.MarshalExtJSON(previousDoc, false, false)
		fmt.Println(string(res))
		//end FindOneAndReplace
	}
}
