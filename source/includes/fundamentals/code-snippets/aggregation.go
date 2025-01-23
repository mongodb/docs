// Performs an aggregation by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
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
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://docs.mongodb.com/drivers/go/current/usage-examples/")
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

	// Inserts sample documents describing tea varieties
	// begin insert docs
	coll := client.Database("db").Collection("tea")
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
		// Creates a stage to group documents by "category" and
		// calculates the average price and total number of documents
		// for each "category"
		// begin average
		groupStage := bson.D{
			{"$group", bson.D{
				{"_id", "$category"},
				{"average_price", bson.D{{"$avg", "$price"}}},
				{"type_total", bson.D{{"$sum", 1}}},
			}}}

		// Performs the aggregation and prints the results
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
		// end average
	}

	fmt.Println("\nAggregation Example - Unset\n")
	{
		// Creates stages to match documents, remove the "category"
		// field, specify a sort, and limit the output to 2 documents
		// begin unset
		matchStage := bson.D{{"$match", bson.D{{"toppings", "milk foam"}}}}
		unsetStage := bson.D{{"$unset", bson.A{"_id", "category"}}}
		sortStage := bson.D{{"$sort", bson.D{{"price", 1}, {"toppings", 1}}}}
		limitStage := bson.D{{"$limit", 2}}

		// Performs the aggregation and prints the results
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
		// end unset
	}
}
