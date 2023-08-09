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

// start-drink-struct
type Drink struct {
	Description string
	Sizes       []int32 `bson:"sizes,truncate"`
	Styles      []string
}

// end-drink-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
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

	client.Database("db").Collection("drinks").Drop(context.TODO())

	// begin insertDocs
	coll := client.Database("db").Collection("drinks")
	docs := []interface{}{
		Drink{Description: "Matcha Latte", Sizes: []int32{12, 16, 20}, Styles: []string{"iced", "hot", "extra hot"}},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nPositional $ Operator:\n")
	{
		// begin positional
		filter := bson.D{{"sizes", bson.D{{"$lte", 16}}}}
		update := bson.D{{"$inc", bson.D{{"sizes.$", -2}}}}
		opts := options.FindOneAndUpdate().
			SetReturnDocument(options.After)

		var updatedDoc Drink
		err := coll.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		res, _ := bson.MarshalExtJSON(updatedDoc, false, false)
		fmt.Println(string(res))
		// end positional
	}

	{
		// Reset data
		filter := bson.D{{"sizes", bson.D{{"$lt", 14}}}}
		update := bson.D{{"$inc", bson.D{{"sizes.$", 2}}}}

		_, err := coll.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println("\nData Restored\n")
	}

	fmt.Println("\nPositional $[<identifier>] Operator:\n")
	{
		// begin filtered positional
		identifier := []interface{}{bson.D{{"hotOptions", bson.D{{"$regex", "hot"}}}}}
		update := bson.D{{"$unset", bson.D{{"styles.$[hotOptions]", ""}}}}
		opts := options.FindOneAndUpdate().
			SetArrayFilters(options.ArrayFilters{Filters: identifier}).
			SetReturnDocument(options.After)

		var updatedDoc Drink
		err := coll.FindOneAndUpdate(context.TODO(), bson.D{}, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		res, _ := bson.MarshalExtJSON(updatedDoc, false, false)
		fmt.Println(string(res))
		// end filtered positional
	}

	{
		// Reset data
		update := bson.D{{"$set", bson.D{{"styles", bson.A{"iced", "hot", "extra hot"}}}}}

		_, err := coll.UpdateOne(context.TODO(), bson.D{}, update)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println("\nData Restored\n")
	}

	fmt.Println("\nPositional $[] Operator:\n")
	{
		// begin positional all
		update := bson.D{{"$mul", bson.D{{"sizes.$[]", 29.57}}}}
		opts := options.FindOneAndUpdate().
			SetReturnDocument(options.After)

		var updatedDoc Drink
		err := coll.FindOneAndUpdate(context.TODO(), bson.D{}, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		res, _ := bson.MarshalExtJSON(updatedDoc, false, false)
		fmt.Println(string(res))
		// end positional all
	}

}
