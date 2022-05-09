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

	// begin insert docs
	coll := client.Database("tea").Collection("menu")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"category", "black"}, {"toppings", bson.A{"ginger", "pumpkin spice", "cinnomon"}}, {"price", 6.75}},
		bson.D{{"type", "Gyokuro"}, {"category", "green"}, {"toppings", bson.A{"berries", "milk foam"}}, {"price", 5.65}},
		bson.D{{"type", "English Breakfast"}, {"category", "black"}, {"toppings", bson.A{"whipped cream", "honey"}}, {"price", 5.75}},
		bson.D{{"type", "Sencha"}, {"category", "green"}, {"toppings", bson.A{"lemon", "whipped cream"}}, {"price", 5.15}},
		bson.D{{"type", "Assam"}, {"category", "black"}, {"toppings", bson.A{"milk foam", "honey", "berries"}}, {"price", 5.65}},
		bson.D{{"type", "Matcha"}, {"category", "green"}, {"toppings", bson.A{"whipped cream", "honey"}}, {"price", 6.45}},
		bson.D{{"type", "Earl Grey"}, {"category", "black"}, {"toppings", bson.A{"milk foam", "pumpkin spice"}}, {"price", 6.15}},
		bson.D{{"type", "Hojicha"}, {"category", "green"}, {"toppings", bson.A{"lemon", "ginger", "milk foam"}}, {"price", 5.55}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	// end insert docs
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("Average:")
	{
		groupStage := bson.D{
			{"$group", bson.D{
				{"_id", "$category"},
				{"average_price", bson.D{
					{"$avg", "$price"},
				}},
				{"type_total", bson.D{
					{"$sum", 1},
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
			fmt.Printf("Average price of %v tea: $%v \n", result["_id"], result["average_price"])
			fmt.Printf("Amount of %v tea: %v \n\n", result["_id"], result["type_total"])
		}
	}

	fmt.Println("Unset:")
	{
		matchStage := bson.D{{"$match", bson.D{{"toppings", "milk foam"}}}}
		unsetStage := bson.D{{"$unset", bson.A{"_id", "category"}}}
		sortStage := bson.D{{"$sort", bson.D{
			{"price", 1},
			{"toppings", 1}},
		}}
		limitStage := bson.D{{"$limit", 2}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, unsetStage, sortStage, limitStage})
		if err != nil {
			panic(err)
		}

		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Printf("Tea: %v \nToppings: %v \nPrice: $%v \n\n", result["type"], result["toppings"], result["price"])
		}
	}
}
