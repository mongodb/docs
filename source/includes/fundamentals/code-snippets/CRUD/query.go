// Creates filters and retrieves documents that match the filters
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-tea-struct
type Tea struct {
	Type   string
	Rating int32
	Vendor []string `bson:"vendor,omitempty" json:"vendor,omitempty"`
}

// end-tea-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
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
		Tea{Type: "Masala", Rating: 10, Vendor: []string{"A", "C"}},
		Tea{Type: "English Breakfast", Rating: 6},
		Tea{Type: "Oolong", Rating: 7, Vendor: []string{"C"}},
		Tea{Type: "Assam", Rating: 5},
		Tea{Type: "Earl Grey", Rating: 8, Vendor: []string{"A", "B"}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	// end insert docs

	if err != nil {
		panic(err)
	}
	fmt.Printf("%d documents inserted with IDs:\n", len(result.InsertedIDs))

	for _, id := range result.InsertedIDs {
		fmt.Printf("\t%s\n", id)
	}

	fmt.Println("\nLiteral Value:\n")
	{
		// Creates a filter to match documents that have a "type" value of "Oolong"
		filter := bson.D{{"type", "Oolong"}}

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter)
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
	}

	fmt.Println("\nComparison:\n")
	{
		// Creates a filter to match documents that have a "rating" value below 7
		filter := bson.D{{"rating", bson.D{{"$lt", 7}}}}

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter)
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
	}

	fmt.Println("\nLogical:\n")
	{
		// Creates a filter to match documents that have a "rating" value less than or equal to 10 and greater than 7
		filter := bson.D{
			{"$and",
				bson.A{
					bson.D{{"rating", bson.D{{"$gt", 7}}}},
					bson.D{{"rating", bson.D{{"$lte", 10}}}},
				},
			},
		}

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter)
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
	}

	fmt.Println("\nElement:\n")
	{
		// Creates a filter to match documents that do not contain the "vendor" field
		filter := bson.D{{"vendor", bson.D{{"$exists", false}}}}

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter)
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
	}

	fmt.Println("\nEvaluation:\n")
	{
		// Creates a filter to match documents that have a "type" value starting with the letter "E"
		filter := bson.D{{"type", bson.D{{"$regex", "^E"}}}}

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter)
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
	}

	fmt.Println("\nArray:\n")
	{
		// Creates a filter to match documents where the "vendor" array contains "C"
		filter := bson.D{{"vendor", bson.D{{"$all", bson.A{"C"}}}}}

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter)
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
	}

	fmt.Println("\nBitwise:\n")
	{
		// Creates a filter to match documents where the "rating" value has the same bits set as 6
		filter := bson.D{{"rating", bson.D{{"$bitsAllSet", 6}}}}

		// Retrieves documents that match the filter and prints them as structs
		cursor, err := coll.Find(context.TODO(), filter)
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
	}

}
