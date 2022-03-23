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

	client.Database("tea").Collection("ratings").Drop(context.TODO())

	// begin insertDocs
	coll := client.Database("tea").Collection("ratings")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"rating", 10}},
		bson.D{{"type", "Earl Grey"}, {"rating", 7}},
		bson.D{{"type", "Oolong"}, {"rating", 10}},
		bson.D{{"type", "Assam"}, {"rating", 7}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	// end insertDocs

	fmt.Println("Delete Many:")
	{
		// begin deleteMany
		filter := bson.D{{"rating", bson.D{{"$gt", 8}}}}
		opts := options.Delete().SetHint(bson.D{{"_id", 1}})

		result, err := coll.DeleteMany(context.TODO(), filter, opts)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents deleted: %d\n", result.DeletedCount)
		// end deleteMany
	}
}
