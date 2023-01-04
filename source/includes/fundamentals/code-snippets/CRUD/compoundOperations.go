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
	Enrollment int32
}

// end-course-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
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
		//begin FindOneAndDelete
		filter := bson.D{{"enrollment", bson.D{{"$lt", 20}}}}

		var deletedDoc Course
		err := coll.FindOneAndDelete(context.TODO(), filter).Decode(&deletedDoc)
		if err != nil {
			panic(err)
		}

		res, _ := bson.MarshalExtJSON(deletedDoc, false, false)
		fmt.Println(string(res))
		//end FindOneAndDelete
	}

	fmt.Println("\nFindOneAndUpdate:\n")
	{
		//begin FindOneAndUpdate
		filter := bson.D{{"title", bson.D{{"$regex", "Modern"}}}}
		update := bson.D{{"$set", bson.D{{"enrollment", 32}}}}
		opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

		var updatedDoc Course
		err := coll.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		res, _ := bson.MarshalExtJSON(updatedDoc, false, false)
		fmt.Println(string(res))
		//end FindOneAndUpdate
	}

	fmt.Println("\nFindOneAndReplace:\n")
	{
		//begin FindOneAndReplace
		filter := bson.D{{"title", "Representation Theory"}}
		replacement := Course{Title: "Combinatorial Theory", Enrollment: 35}

		var previousDoc Course
		err := coll.FindOneAndReplace(context.TODO(), filter, replacement).Decode(&previousDoc)
		if err != nil {
			panic(err)
		}

		res, _ := bson.MarshalExtJSON(previousDoc, false, false)
		fmt.Println(string(res))
		//end FindOneAndReplace
	}
}
