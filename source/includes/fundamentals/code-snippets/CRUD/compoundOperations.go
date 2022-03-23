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
		bson.D{{"type", "Assam"}, {"rating", 5}},
		bson.D{{"type", "Oolong"}, {"rating", 7}},
		bson.D{{"type", "Earl Grey"}, {"rating", 8}},
		bson.D{{"type", "English Breakfast"}, {"rating", 5}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	//end insertDocs

	fmt.Println("FindOneAndDelete:")
	{
		//begin FindOneAndDelete
		filter := bson.D{{"type", "Assam"}}

		var deletedDoc bson.D
		err := coll.FindOneAndDelete(context.TODO(), filter).Decode(&deletedDoc)
		if err != nil {
			panic(err)
		}

		fmt.Println(deletedDoc)
		//end FindOneAndDelete
	}

	fmt.Println("FindOneAndReplace:")
	{
		//begin FindOneAndReplace
		filter := bson.D{{"type", "English Breakfast"}}
		replacement := bson.D{{"type", "Ceylon"}, {"rating", 6}}

		var previousDoc bson.D
		err := coll.FindOneAndReplace(context.TODO(), filter, replacement).Decode(&previousDoc)
		if err != nil {
			panic(err)
		}

		fmt.Println(previousDoc)
		//end FindOneAndReplace
	}

	fmt.Println("FindOneAndUpdate:")
	{
		//begin FindOneAndUpdate
		filter := bson.D{{"type", "Oolong"}}
		update := bson.D{{"$set", bson.D{{"rating", 9}}}}
		opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

		var updatedDoc bson.D
		err := coll.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		fmt.Println(updatedDoc)
		//end FindOneAndUpdate
	}
}
