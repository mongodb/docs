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
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))
	// end insert docs

	fmt.Println("Find:")
	{
		// begin find docs
		filter := bson.D{
			{"$and",
				bson.A{
					bson.D{{"rating", bson.D{{"$gt", 5}}}},
					bson.D{{"rating", bson.D{{"$lt", 10}}}},
				}},
		}
		projection := bson.D{{"type", 1}, {"rating", 1}, {"_id", 0}}
		opts := options.Find().SetProjection(projection)

		cursor, err := coll.Find(context.TODO(), filter, opts)
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
		// end find docs
	}

	fmt.Println("Find One:")
	{
		// begin find one docs
		filter := bson.D{}
		sort := bson.D{{"rating", -1}}
		projection := bson.D{{"type", 1}, {"rating", 1}, {"_id", 0}}
		opts := options.FindOne().SetSort(sort).SetProjection(projection)

		var result bson.D
		err := coll.FindOne(context.TODO(), filter, opts).Decode(&result)
		if err != nil {
			panic(err)
		}

		fmt.Println(result)
		// end find one docs
	}

	fmt.Println("Aggregation:")
	{
		// begin aggregate docs
		groupStage := bson.D{
			{"$group", bson.D{
				{"_id", "$type"},
				{"average", bson.D{
					{"$avg", "$rating"},
				}},
			}}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{groupStage})
		if err != nil {
			panic(err)
		}

		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Printf("%v has an average rating of %v \n", result["_id"], result["average"])
		}
		// end aggregate docs
	}
}
