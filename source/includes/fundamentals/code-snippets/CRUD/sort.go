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

	fmt.Println("Ascending Sort:")
	//begin ascending sort
	ascendingFilter := bson.D{}
	acendingSort := bson.D{{"rating", 1}}
	ascendingOptions := options.Find().SetSort(acendingSort)

	ascendingCursor, ascendingErr := coll.Find(context.TODO(), ascendingFilter, ascendingOptions)

	var ascendingResults []bson.D
	if ascendingErr = ascendingCursor.All(context.TODO(), &ascendingResults); ascendingErr != nil {
		panic(ascendingErr)
	}
	for _, result := range ascendingResults {
		fmt.Println(result)
	}
	//end ascending sort

	fmt.Println("Descending Sort:")
	//begin descending sort
	descendingFilter := bson.D{}
	descendingSort := bson.D{{"rating", -1}}
	descendingOptions := options.Find().SetSort(descendingSort)

	descendingCursor, descendingErr := coll.Find(context.TODO(), descendingFilter, descendingOptions)

	var descendingResults []bson.D
	if descendingErr = descendingCursor.All(context.TODO(), &descendingResults); descendingErr != nil {
		panic(descendingErr)
	}
	for _, result := range descendingResults {
		fmt.Println(result)
	}
	//end descending sort

	fmt.Println("Multi Sort:")
	//begin multi sort
	findFilter := bson.D{}
	sort := bson.D{{"rating", 1}, {"type", -1}}
	findOptions := options.Find().SetSort(sort)

	findCursor, findErr := coll.Find(context.TODO(), findFilter, findOptions)

	var findResults []bson.D
	if findErr = findCursor.All(context.TODO(), &findResults); findErr != nil {
		panic(findErr)
	}
	for _, result := range findResults {
		fmt.Println(result)
	}
	//end multi sort

	fmt.Println("Aggregation Sort:")
	// begin aggregate sort
	sortStage := bson.D{{"$sort", bson.D{{"rating", -1}, {"type", 1}}}}

	aggCursor, aggErr := coll.Aggregate(context.TODO(), mongo.Pipeline{sortStage})
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
	// end aggregate sort
}
