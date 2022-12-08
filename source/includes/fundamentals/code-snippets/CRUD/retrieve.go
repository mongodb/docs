package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// start-review-struct
type Review struct {
	Item        string
	Rating      int32
	DateOrdered time.Time `bson:"date_ordered"`
}

// end-review-struct

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

	// begin insert docs
	coll := client.Database("tea").Collection("reviews")
	docs := []interface{}{
		Review{Item: "Masala", Rating: 10, DateOrdered: time.Date(2009, 11, 17, 0, 0, 0, 0, time.Local)},
		Review{Item: "Sencha", Rating: 7, DateOrdered: time.Date(2009, 11, 18, 0, 0, 0, 0, time.Local)},
		Review{Item: "Masala", Rating: 9, DateOrdered: time.Date(2009, 11, 12, 0, 0, 0, 0, time.Local)},
		Review{Item: "Masala", Rating: 8, DateOrdered: time.Date(2009, 12, 1, 0, 0, 0, 0, time.Local)},
		Review{Item: "Sencha", Rating: 10, DateOrdered: time.Date(2009, 12, 17, 0, 0, 0, 0, time.Local)},
		Review{Item: "Hibiscus", Rating: 4, DateOrdered: time.Date(2009, 12, 18, 0, 0, 0, 0, time.Local)},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	// end insert docs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nFind:\n")
	{
		// begin find docs
		filter := bson.D{
			{"$and",
				bson.A{
					bson.D{{"rating", bson.D{{"$gt", 5}}}},
					bson.D{{"rating", bson.D{{"$lt", 9}}}},
				}},
		}
		sort := bson.D{{"date_ordered", 1}}
		opts := options.Find().SetSort(sort)

		cursor, err := coll.Find(context.TODO(), filter, opts)
		if err != nil {
			panic(err)
		}

		var results []Review
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
		// end find docs
	}

	fmt.Println("\nFind One:\n")
	{
		// begin find one docs
		filter := bson.D{{"date_ordered", bson.D{{"$lte", time.Date(2009, 11, 30, 0, 0, 0, 0, time.Local)}}}}
		opts := options.FindOne().SetSkip(2)

		var result Review
		err := coll.FindOne(context.TODO(), filter, opts).Decode(&result)
		if err != nil {
			panic(err)
		}

		res, _ := json.Marshal(result)
		fmt.Println(string(res))
		// end find one docs
	}

	fmt.Println("\nAggregation:\n")
	{
		// begin aggregate docs
		groupStage := bson.D{
			{"$group", bson.D{
				{"_id", "$item"},
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
			fmt.Printf("%v had an average rating of %v \n", result["_id"], result["average"])
		}
		// end aggregate docs
	}
}
