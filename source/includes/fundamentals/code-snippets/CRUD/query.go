package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
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
	coll := client.Database("tea").Collection("ratings")
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
		filter := bson.D{{"type", "Oolong"}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nComparison:\n")
	{
		filter := bson.D{{"rating", bson.D{{"$lt", 7}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nLogical:\n")
	{
		filter := bson.D{
			{"$and",
				bson.A{
					bson.D{{"rating", bson.D{{"$gt", 7}}}},
					bson.D{{"rating", bson.D{{"$lte", 10}}}},
				},
			},
		}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nElement:\n")
	{
		filter := bson.D{{"vendor", bson.D{{"$exists", false}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nEvaluation:\n")
	{
		filter := bson.D{{"type", bson.D{{"$regex", "^E"}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nArray:\n")
	{
		filter := bson.D{{"vendor", bson.D{{"$all", bson.A{"C"}}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nBitwise:\n")
	{
		filter := bson.D{{"rating", bson.D{{"$bitsAllSet", 6}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := json.Marshal(result)
			fmt.Println(string(res))
		}
	}

}
