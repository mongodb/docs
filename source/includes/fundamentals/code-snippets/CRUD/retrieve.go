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
	if uri = os.Getenv("DRIVER_REF_URI"); uri == "" {
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

	// begin insert docs
	coll := client.Database("tea").Collection("ratings")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"rating", 10}},
		bson.D{{"type", "Earl Grey"}, {"rating", 5}},
		bson.D{{"type", "Masala"}, {"rating", 7}},
		bson.D{{"type", "Earl Grey"}, {"rating", 9}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%d documents inserted with IDs:\n", len(result.InsertedIDs))
	// end insert docs

	for _, id := range result.InsertedIDs {
		fmt.Printf("\t%s\n", id)
	}

	fmt.Println("Find:")
	// begin find docs
	findFilter := bson.D{
		{"$and",
			bson.A{
				bson.D{{"rating", bson.D{{"$gt", 5}}}},
				bson.D{{"rating", bson.D{{"$lt", 10}}}},
			}},
	}
	findProjection := bson.D{{"type", 1}, {"rating", 1}, {"_id", 0}}
	findOptions := options.Find().SetProjection(findProjection)

	findCursor, findErr := coll.Find(context.TODO(), findFilter, findOptions)
	if findErr != nil {
		panic(findErr)
	}

	var findResults []bson.D
	if findErr = findCursor.All(context.TODO(), &findResults); findErr != nil {
		panic(findErr)
	}
	for _, result := range findResults {
		fmt.Println(result)
	}
	// end find docs

	fmt.Println("Find One:")
	// begin find one docs
	findOneFilter := bson.D{}
	findOnesort := bson.D{{"rating", -1}}
	findOneprojection := bson.D{{"type", 1}, {"rating", 1}, {"_id", 0}}
	findOneOptions := options.FindOne().SetSort(findOnesort).SetProjection(findOneprojection)

	var findOneResult bson.D
	findOneErr := coll.FindOne(context.TODO(), findOneFilter, findOneOptions).Decode(&findOneResult)
	if findOneErr != nil {
		panic(findOneErr)
	}
	
	fmt.Println(findOneResult)
	// end find one docs	

	fmt.Println("Aggregation:")
	// begin aggregate docs
	groupStage := bson.D{
		{"$group", bson.D{
			{"_id", "$type"},
			{"average", bson.D{
				{"$avg", "$rating"},
			}},
		}}}

	aggCursor, aggErr := coll.Aggregate(context.TODO(), mongo.Pipeline{groupStage})
	if aggErr != nil {
		panic(aggErr)
	}

	var aggResults []bson.M
	if aggErr = aggCursor.All(context.TODO(), &aggResults); aggErr != nil {
		panic(aggErr)
	}
	for _, result := range aggResults {
		fmt.Printf("%v has an average rating of %v \n", result["_id"], result["average"])
	}
	// end aggregate docs
}
