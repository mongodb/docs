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

	client.Database("tea").Collection("ratings").Drop(context.TODO())

	// begin insert docs
	coll := client.Database("tea").Collection("ratings")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"rating", 10}},
		bson.D{{"type", "Matcha"}, {"rating", 7}},
		bson.D{{"type", "Assam"}, {"rating", 4}},
		bson.D{{"type", "Oolong"}, {"rating", 9}},
		bson.D{{"type", "Chrysanthemum"}, {"rating", 5}},
		bson.D{{"type", "Earl Grey"}, {"rating", 8}},
		bson.D{{"type", "Jasmine"}, {"rating", 3}},
		bson.D{{"type", "English Breakfast"}, {"rating", 6}},
		bson.D{{"type", "White Peony"}, {"rating", 4}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	//end insert docs

	{
		// begin count documents
		filter := bson.D{{"rating", bson.D{{"$lt", 6}}}}

		count, err := coll.CountDocuments(context.TODO(), filter)
		if err != nil {
			panic(err)
		}
		fmt.Printf("Number of ratings less than six: %d\n", count)
		// end count documents
	}

	{
		// begin est doc count
		count, err := coll.EstimatedDocumentCount(context.TODO())
		if err != nil {
			panic(err)
		}
		fmt.Printf("Estimated number of documents in the ratings collection: %d\n", count)
		// end est doc count
	}

	{
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
