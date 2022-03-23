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

	client.Database("tea").Collection("quantity").Drop(context.TODO())

	// begin insert docs
	coll := client.Database("tea").Collection("quantity")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"qty", bson.A{15, 12, 18}}},
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

	fmt.Println("Positional $ Operator:")
	{
		// begin positional
		filter := bson.D{{"qty", bson.D{{"$gt", 10}}}}
		update := bson.D{{"$inc", bson.D{{"qty.$", -5}}}}
		opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

		var updatedDoc bson.D
		err := coll.FindOneAndUpdate(context.TODO(), filter, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		fmt.Println(updatedDoc)
		// end positional
	}

	{
		update := bson.D{{"$set", bson.D{{"qty", bson.A{15, 12, 18} }}}}

		result, err := coll.UpdateOne(context.TODO(), bson.D{}, update)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%v document was updated.\n", result.ModifiedCount)
	}

	fmt.Println("Positional $[] Operator:")
	{
		// begin positional all
		update := bson.D{{"$mul", bson.D{{"qty.$[]", 2}}}}
		opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

		var updatedDoc bson.D
		err := coll.FindOneAndUpdate(context.TODO(), bson.D{}, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		fmt.Println(updatedDoc)
		// end positional all
	}


	{
		update := bson.D{{"$set", bson.D{{"qty", bson.A{15, 12, 18} }}}}

		result, err := coll.UpdateOne(context.TODO(), bson.D{}, update)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%v document was updated.\n", result.ModifiedCount)
	}

	fmt.Println("Positional $[<identifier>] Operator:")
	{
		// begin filtered positional
		identifier := []interface{}{bson.D{{"smaller", bson.D{{"$lt", 18}}}}}
		update := bson.D{{"$inc", bson.D{{"qty.$[smaller]", 7}}}}
		opts := options.FindOneAndUpdate().SetArrayFilters(options.ArrayFilters{Filters: identifier}).SetReturnDocument(options.After)

		var updatedDoc bson.D
		err := coll.FindOneAndUpdate(context.TODO(), bson.D{}, update, opts).Decode(&updatedDoc)
		if err != nil {
			panic(err)
		}

		fmt.Println(updatedDoc)
		// end filtered positional
	}
}
