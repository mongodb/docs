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

	client.Database("tea").Collection("ratings").Drop(context.TODO())

	// begin insert docs
	coll := client.Database("tea").Collection("ratings")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"rating", 10}, {"vendor", bson.A{"A", "C"}}},
		bson.D{{"type", "English Breakfast"}, {"rating", 6}},
		bson.D{{"type", "Oolong"}, {"rating", 7}, {"vendor", bson.A{"C"}}},
		bson.D{{"type", "Assam"}, {"rating", 5}},
		bson.D{{"type", "Earl Grey"}, {"rating", 8}, {"vendor", bson.A{"A", "B"}}},
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

	fmt.Println("Literal:")
	{
		// begin literal
		filter := bson.D{{"type", "Oolong"}}

		cursor, err := coll.Find(context.TODO(), filter)
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
		// end literal
	}

	fmt.Println("Comparison:")
	{
		// begin comparison
		filter := bson.D{{"rating", bson.D{{"$lt", 7}}}}

		cursor, err := coll.Find(context.TODO(), filter)
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
		// end comparison
	}
	fmt.Println("Logical:")
	{
		// begin logical
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

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
		// end logical
	}

	fmt.Println("Element:")
	{
	// begin element
		filter := bson.D{{"vendor", bson.D{{"$exists", false}}}}

		cursor, err := coll.Find(context.TODO(), filter)
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
		// end element
	}

	fmt.Println("Evaluation:")
	{
		// begin evaluation
		filter := bson.D{{"type", bson.D{{"$regex", "^E"}}}}

		cursor, err := coll.Find(context.TODO(), filter)
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
		// end evaluation
	}

	fmt.Println("Array:")
	{
		// begin array
		filter := bson.D{{"vendor", bson.D{{"$all", bson.A{"C"}}}}}

		cursor, err := coll.Find(context.TODO(), filter)
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
		// end array
	}

	fmt.Println("Bitwise:")
	{
		// begin bitwise
		filter := bson.D{{"rating", bson.D{{"$bitsAllSet", 6}}}}

		cursor, err := coll.Find(context.TODO(), filter)
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
		// end bitwise
	}
}
