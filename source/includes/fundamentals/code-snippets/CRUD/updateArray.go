// Updates array fields of documents by using the Go driver
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

	client, err := mongo.Connect(options.Client().ApplyURI(uri))

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
	docsToInsert := []interface{}{
		Drink{Description: "Matcha Latte", Sizes: []int32{12, 16, 20}, Styles: []string{"iced", "hot", "extra hot"}},
	}

	result, err := coll.InsertMany(context.TODO(), docsToInsert)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nPositional $ Operator:\n")
	{
		// Creates a filter and update document to match a "sizes" array
		// value and decrease the value by 2
		// begin positional
		filter := bson.D{{"sizes", bson.D{{"$lte", 16}}}}
		update := bson.D{{"$inc", bson.D{{"sizes.$", -2}}}}
		opts := options.FindOneAndUpdate().
			SetReturnDocument(options.After)

		// Updates the first document that matches the filter
		var updatedDoc Drink
		err := coll.FindOneAndUpdate(context.TODO(), filter, update, opts).
			Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		// Prints the updated document
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
			panic(err)
		}

		fmt.Println("\nData Restored\n")
	}

	fmt.Println("\nPositional $[<identifier>] Operator:\n")
	{
		// Creates a filter and update document to match "sizes" array
		// values and remove those values
		// begin filtered positional
		identifier := []interface{}{bson.D{{"hotOptions", bson.D{{"$regex", "hot"}}}}}
		update := bson.D{{"$unset", bson.D{{"styles.$[hotOptions]", ""}}}}
		opts := options.FindOneAndUpdate().
			SetArrayFilters(identifier).
			SetReturnDocument(options.After)

		// Updates the first document that matches the filter
		var updatedDoc Drink
		err := coll.FindOneAndUpdate(context.TODO(), bson.D{}, update, opts).
			Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		// Prints the updated document
		res, _ := bson.MarshalExtJSON(updatedDoc, false, false)
		fmt.Println(string(res))
		// end filtered positional
	}

	{
		// Reset data
		update := bson.D{{"$set", bson.D{{"styles", bson.A{"iced", "hot", "extra hot"}}}}}

		_, err := coll.UpdateOne(context.TODO(), bson.D{}, update)
		if err != nil {
			panic(err)
		}

		fmt.Println("\nData Restored\n")
	}

	fmt.Println("\nPositional $[] Operator:\n")
	{
		// Creates a filter and update document to match all "sizes" array
		// values and multiply them by a value
		// begin positional all
		update := bson.D{{"$mul", bson.D{{"sizes.$[]", 29.57}}}}
		opts := options.FindOneAndUpdate().
			SetReturnDocument(options.After)

		// Updates the first document that matches the filter
		var updatedDoc Drink
		err := coll.FindOneAndUpdate(context.TODO(), bson.D{}, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		// Prints the updated document
		res, _ := bson.MarshalExtJSON(updatedDoc, false, false)
		fmt.Println(string(res))
		// end positional all
	}

}
