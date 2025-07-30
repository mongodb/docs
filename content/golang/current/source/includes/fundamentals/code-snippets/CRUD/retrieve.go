// Retrieves documents that match specified filters
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-tea-struct
type Tea struct {
	Item        string    `bson:"item,omitempty"`
	Rating      int32     `bson:"rating,omitempty"`
	DateOrdered time.Time `bson:"date_ordered,omitempty"`
}

// end-tea-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin insert docs
	coll := client.Database("db").Collection("tea")
	docs := []interface{}{
		Tea{Item: "Masala", Rating: 10, DateOrdered: time.Date(2009, 11, 17, 0, 0, 0, 0, time.Local)},
		Tea{Item: "Sencha", Rating: 7, DateOrdered: time.Date(2009, 11, 18, 0, 0, 0, 0, time.Local)},
		Tea{Item: "Masala", Rating: 9, DateOrdered: time.Date(2009, 11, 12, 0, 0, 0, 0, time.Local)},
		Tea{Item: "Masala", Rating: 8, DateOrdered: time.Date(2009, 12, 1, 0, 0, 0, 0, time.Local)},
		Tea{Item: "Sencha", Rating: 10, DateOrdered: time.Date(2009, 12, 17, 0, 0, 0, 0, time.Local)},
		Tea{Item: "Hibiscus", Rating: 4, DateOrdered: time.Date(2009, 12, 18, 0, 0, 0, 0, time.Local)},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	// end insert docs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nFind:\n")
	{
		//  Creates a filter to match documents that have a "rating" value between 5 and 9
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

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter, opts)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		// end find docs
	}

	fmt.Println("\nFind One:\n")
	{
		// Creates a filter to match documents that have a
		// "date_ordered" value before December 2009
		// begin find one docs
		filter := bson.D{{"date_ordered", bson.D{{"$lte", time.Date(2009, 11, 30, 0, 0, 0, 0, time.Local)}}}}
		opts := options.FindOne().SetSkip(2)

		// Retrieves a document that matches the filter and prints it as
		// a struct
		var result Tea
		err = coll.FindOne(context.TODO(), filter, opts).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				fmt.Println("No documents found")
			} else {
				panic(err)
			}
		}

		res, _ := bson.MarshalExtJSON(result, false, false)
		fmt.Println(string(res))
		// end find one docs
	}

	fmt.Println("\nFind One by ObjectId:\n")
	{
		// begin objectid
		id, err := bson.ObjectIDFromHex("65170b42b99efdd0b07d42de")
		if err != nil {
			panic(err)
		}

		//  Creates a filter to match a document that has the specified
		//  "_id" value
		filter := bson.D{{"_id", id}}
		opts := options.FindOne().SetProjection(bson.D{{"item", 1}, {"rating", 1}})

		// Retrieves a document that matches the filter and prints it as
		// a struct
		var result Tea
		err = coll.FindOne(context.TODO(), filter, opts).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				fmt.Println("No documents found")
			} else {
				panic(err)
			}
		}

		res, _ := bson.MarshalExtJSON(result, false, false)
		fmt.Println(string(res))
		// end objectid
	}

	fmt.Println("\nAggregation:\n")
	{
		// Creates an aggregation to group documents by "item" and finds
		// the average "rating" value
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

		// Prints the average "rating" for each item
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
