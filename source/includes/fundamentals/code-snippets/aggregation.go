package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// start-tea-struct
type Tea struct {
	Type     string
	Category string
	Toppings []string
	Price    float32
}

// end-tea-struct

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

	// begin insert docs
	coll := client.Database("tea").Collection("menu")
	docs := []interface{}{
		Tea{Type: "Masala", Category: "black", Toppings: []string{"ginger", "pumpkin spice", "cinnamon"}, Price: 6.75},
		Tea{Type: "Gyokuro", Category: "green", Toppings: []string{"berries", "milk foam"}, Price: 5.65},
		Tea{Type: "English Breakfast", Category: "black", Toppings: []string{"whipped cream", "honey"}, Price: 5.75},
		Tea{Type: "Sencha", Category: "green", Toppings: []string{"lemon", "whipped cream"}, Price: 5.15},
		Tea{Type: "Assam", Category: "black", Toppings: []string{"milk foam", "honey", "berries"}, Price: 5.65},
		Tea{Type: "Matcha", Category: "green", Toppings: []string{"whipped cream", "honey"}, Price: 6.45},
		Tea{Type: "Earl Grey", Category: "black", Toppings: []string{"milk foam", "pumpkin spice"}, Price: 6.15},
		Tea{Type: "Hojicha", Category: "green", Toppings: []string{"lemon", "ginger", "milk foam"}, Price: 5.55},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	// end insert docs

	if err != nil {
		panic(err)
	}

	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nAggregation Example - Average\n")
	{
		groupStage := bson.D{
			{"$group", bson.D{
				{"_id", "$category"},
				{"average_price", bson.D{{"$avg", "$price"}}},
				{"type_total", bson.D{{"$sum", 1}}},
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
			fmt.Printf("Average price of %v tea options: $%v \n", result["_id"], result["average_price"])
			fmt.Printf("Number of %v tea options: %v \n\n", result["_id"], result["type_total"])
		}
	}

	fmt.Println("\nAggregation Example - Unset\n")
	{
		matchStage := bson.D{{"$match", bson.D{{"toppings", "milk foam"}}}}
		unsetStage := bson.D{{"$unset", bson.A{"_id", "category"}}}
		sortStage := bson.D{{"$sort", bson.D{{"price", 1}, {"toppings", 1}}}}
		limitStage := bson.D{{"$limit", 2}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, unsetStage, sortStage, limitStage})
		if err != nil {
			panic(err)
		}

		var results []Tea
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Printf("Tea: %v \nToppings: %v \nPrice: $%v \n\n", result.Type, strings.Join(result.Toppings, ", "), result.Price)
		}
	}
}
