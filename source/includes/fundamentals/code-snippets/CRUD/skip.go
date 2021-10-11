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
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://docs.mongodb.com/drivers/go/current/usage-examples/")
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

	result, insertErr := coll.InsertMany(context.TODO(), docs)
	if insertErr != nil {
		panic(insertErr)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	//end insertDocs

	fmt.Println("Skip:")
	//begin skip
	skipFilter := bson.D{}
	skipOptions := options.Find().SetSort(bson.D{{"rating", 1}}).SetSkip(2)

	skipCursor, skipErr := coll.Find(context.TODO(), skipFilter, skipOptions)

	var skipResults []bson.D
	if skipErr = skipCursor.All(context.TODO(), &skipResults); skipErr != nil {
		panic(skipErr)
	}
	for _, result := range skipResults {
		fmt.Println(result)
	}
	//end skip

	fmt.Println("Aggegation Skip:")
	// begin aggregate skip
	sortStage := bson.D{{"$sort", bson.D{{"rating", -1}}}}
	skipStage := bson.D{{"$skip", 3}}

	aggCursor, aggErr := coll.Aggregate(context.TODO(), mongo.Pipeline{sortStage, skipStage})
	if aggErr != nil {
		panic(aggErr)
	}

	var aggResults []bson.D
	if aggErr = aggCursor.All(context.TODO(), &aggResults); aggErr != nil {
		panic(aggErr)
	}
	for _, result := range aggResults {
		fmt.Println(result)
	}
	// end aggregate skip
}
