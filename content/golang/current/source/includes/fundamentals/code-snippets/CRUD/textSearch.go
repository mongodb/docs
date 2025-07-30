// Performs text searches by using the Go driver
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

// start-dish-struct
type Dish struct {
	Name        string
	Description string
}

// end-dish-struct

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
	coll := client.Database("db").Collection("menu")
	docs := []interface{}{
		Dish{Name: "Shepherd’s Pie", Description: "A vegetarian take on the classic dish that uses lentils as a base. Serves 2."},
		Dish{Name: "Green Curry", Description: "A flavorful Thai curry, made vegetarian with fried tofu. Vegetarian and vegan friendly."},
		Dish{Name: "Herbed Whole Branzino", Description: "Grilled whole fish stuffed with herbs and pomegranate seeds. Serves 3-4."},
		Dish{Name: "Kale Tabbouleh", Description: "A bright, herb-based salad. A perfect starter for vegetarians and vegans."},
		Dish{Name: "Garlic Butter Trout", Description: "Baked trout seasoned with garlic, lemon, dill, and, of course, butter. Serves 2."},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insert docs

	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	// Creates a text index on the "description" field
	//begin text index
	model := mongo.IndexModel{Keys: bson.D{{"description", "text"}}}
	name, err := coll.Indexes().CreateOne(context.TODO(), model)
	if err != nil {
		panic(err)
	}

	fmt.Println("Name of index created: " + name)
	//end text index

	fmt.Println("\nTerm Search:\n")
	{
		// Retrieves and prints documents containing the "herb" string
		// in any fields associated with a text index
		//begin term search
		filter := bson.D{{"$text", bson.D{{"$search", "herb"}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Dish
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		//end term search
	}

	fmt.Println("\nPhrase Search:\n")
	{
		// Retrieves and prints documents containing the "serves 2" phrase
		// in any fields associated with a text index
		//begin phrase search
		filter := bson.D{{"$text", bson.D{{"$search", "\"serves 2\""}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Dish
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		//end phrase search
	}

	fmt.Println("\nExcluded Term Search:\n")
	{
		// Retrieves and prints documents containing the "vegan" but
		// not the "tofu" string in any fields associated with a text
		// index
		//begin exclude term search
		filter := bson.D{{"$text", bson.D{{"$search", "vegan -tofu"}}}}

		cursor, err := coll.Find(context.TODO(), filter)
		if err != nil {
			panic(err)
		}

		var results []Dish
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		//end exclude term search
	}

	fmt.Println("\nSort By Relevance:\n")
	{
		// Retrieves and prints documents containing the "vegetarian"
		// string and sorts the results by relevance based on the
		// "textScore" field
		//begin text score
		filter := bson.D{{"$text", bson.D{{"$search", "vegetarian"}}}}
		sort := bson.D{{"score", bson.D{{"$meta", "textScore"}}}}
		projection := bson.D{{"name", 1}, {"score", bson.D{{"$meta", "textScore"}}}, {"_id", 0}}
		opts := options.Find().SetSort(sort).SetProjection(projection)

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
		//end text score
	}

	fmt.Println("\nAggregation Text Search:\n")
	{
		// Uses an aggregation pipeline to retrieve documents containing
		// the "herb" string in any fields associated with a text index
		// begin aggregate text search
		matchStage := bson.D{{"$match", bson.D{{"$text", bson.D{{"$search", "herb"}}}}}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage})
		if err != nil {
			panic(err)
		}

		var results []Dish
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
		// end aggregate text search
	}

	fmt.Println("\nAggregation Sort By Relevance:\n")
	{
		// Uses an aggregation pipeline to retrieve documents containing the "vegetarian"
		// string and sorts the results by relevance based on the
		// "textScore" field
		// begin aggregate text score
		matchStage := bson.D{{"$match", bson.D{{"$text", bson.D{{"$search", "vegetarian"}}}}}}
		sortStage := bson.D{{"$sort", bson.D{{"score", bson.D{{"$meta", "textScore"}}}}}}
		projectStage := bson.D{{"$project", bson.D{{"name", 1}, {"score", bson.D{{"$meta", "textScore"}}}, {"_id", 0}}}}

		cursor, err := coll.Aggregate(context.TODO(), mongo.Pipeline{matchStage, sortStage, projectStage})
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
		// end aggregate text score
	}

}
