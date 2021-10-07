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

	fmt.Println("Limit:")
	//begin limit
	limitFilter := bson.D{}
	limitOptions := options.Find().SetLimit(2)

	limitCursor, limitErr := coll.Find(context.TODO(), limitFilter, limitOptions)

	var limitResults []bson.D
	if limitErr = limitCursor.All(context.TODO(), &limitResults); limitErr != nil {
		panic(limitErr)
	}
	for _, result := range limitResults {
		fmt.Println(result)
	}
	//end limit

	fmt.Println("Limit, Skip and Sort:")
	//begin multi options
	multiFilter := bson.D{}
	multiOptions := options.Find().SetSort(bson.D{{"rating", -1}}).SetLimit(2).SetSkip(1)

	multiCursor, multiErr := coll.Find(context.TODO(), multiFilter, multiOptions)

	var multiResults []bson.D
	if multiErr = multiCursor.All(context.TODO(), &multiResults); multiErr != nil {
		panic(multiErr)
	}
	for _, result := range multiResults {
		fmt.Println(result)
	}
	//end multi options

	fmt.Println("Aggregation Limit:")
	// begin aggregate limit
	limitStage := bson.D{{"$limit", 2}}

	aggCursor, aggErr := coll.Aggregate(context.TODO(), mongo.Pipeline{limitStage})
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
	// end aggregate limit
}
