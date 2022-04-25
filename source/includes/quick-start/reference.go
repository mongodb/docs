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

func main() {
	var uri string
	if uri = os.Getenv("DRIVER_REF_URI"); uri == "" {
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

	coll := client.Database("tea").Collection("ratings")

	// delete one --> deletes one
	fmt.Println("\nDelte One: ")
	{
		result, err := coll.DeleteOne(context.TODO(), bson.D{{"type", "Earl Grey"}})
		if err != nil {
			panic(err)
		}

		fmt.Printf("Documents deleted: %d\n", result.DeletedCount)
	}

	// delete many --> deletes 3
	fmt.Println("\nDelete Many: ")
	{
		results, err := coll.DeleteMany(context.TODO(), bson.D{{"rating", bson.D{{"$gt", 7}}}})
		if err != nil {
			panic(err)
		}

		fmt.Printf("Documents deleted: %d\n", results.DeletedCount)
	}

	// insert one --> inserts one doc
	fmt.Println("\nInsert One: ")
	{
		client.Database("tea").Collection("ratings").Drop(context.TODO())
		coll := client.Database("tea").Collection("ratings")
		result, err := coll.InsertOne(context.TODO(), bson.D{{"type", "Masala"}, {"rating", 10}, {"vendor", bson.A{"A", "C"}}})
		if err != nil {
			panic(err)
		}
		fmt.Printf("Document inserted with ID: %s\n", result.InsertedID)
	}

	// insert many --> Should print
	fmt.Println("\nInsert Many: ")
	{
		docs := []interface{}{
			bson.D{{"type", "English Breakfast"}, {"rating", 6}},
			bson.D{{"type", "Oolong"}, {"rating", 7}, {"vendor", bson.A{"C"}}},
			bson.D{{"type", "Assam"}, {"rating", 5}},
			bson.D{{"type", "Earl Grey"}, {"rating", 8}, {"vendor", bson.A{"A", "B"}}},
		}

		result, err := coll.InsertMany(context.TODO(), docs)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%d documents inserted.\n", len(result.InsertedIDs))
	}

	// find one --> should print Assam
	fmt.Println("\nFind One: ")
	{
		var result bson.M
		err = coll.FindOne(context.TODO(), bson.D{{"rating", 5}}).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				// This error means your query did not match any documents.
				return
			}
			panic(err)
		}
		output, err := json.MarshalIndent(result, "", "    ")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s\n", output)
	}

	// find  many --> should print Masala and Earl Grey
	fmt.Println("\nFind Many: ")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{{"rating", bson.D{{"$gte", 8}}}})
		if err != nil {
			panic(err)
		}

		var results []bson.M
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			output, err := json.MarshalIndent(result, "", "    ")
			if err != nil {
				panic(err)
			}
			fmt.Printf("%s\n", output)
		}
	}

	// update one --> prints 1
	fmt.Println("\nUpdate One: ")
	{
		result, err := coll.UpdateOne(context.TODO(), bson.D{{"type", "Oolong"}}, bson.D{{"$set", bson.D{{"rating", 8}}}})
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %v\n", result.ModifiedCount)
	}

	// update many --> prints 4
	fmt.Println("\nUpdate Many: ")
	{
		result, err := coll.UpdateMany(context.TODO(), bson.D{{"rating", bson.D{{"$lt", 10}}}}, bson.D{{"$inc", bson.D{{"rating", 2}}}})
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %v\n", result.ModifiedCount)
	}

	// update array --> adds D to all vendors
	fmt.Println("\nUpdate Array: ")
	{
		result, err := coll.UpdateMany(context.TODO(), bson.D{}, bson.D{{"$push", bson.D{{"vendor", "D"}}}})
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %v\n", result.ModifiedCount)
	}

	// replace one --> prints 1
	fmt.Println("\nReplace One: ")
	{
		result, err := coll.ReplaceOne(context.TODO(), bson.D{{"type", "Oolong"}}, bson.D{{"type", "Jasmine"}, {"rating", 9}})
		if err != nil {
			panic(err)
		}
		fmt.Println("Number of documents replaced: ", result.ModifiedCount)
	}

	// bulk write --> should print 1 each
	fmt.Println("\nBulk Write: ")
	{
		models := []mongo.WriteModel{
			mongo.NewInsertOneModel().SetDocument(bson.D{{"type", "Chrysanthemum"}, {"rating", 5}}),
			mongo.NewUpdateOneModel().SetFilter(bson.D{{"type", "Jasmine"}}).
				SetUpdate(bson.D{{"$set", bson.D{{"type", "Oolong"}}}}),
		}
		opts := options.BulkWrite().SetOrdered(true)

		results, err := coll.BulkWrite(context.TODO(), models, opts)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %d", results.ModifiedCount)
		fmt.Printf("\nNumber of documents inserted: %d", results.InsertedCount)

	}

	// cursor individually	--> prints all documents
	fmt.Println("\nCursor Individually: ")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}

		defer cursor.Close(context.TODO())

		for cursor.Next(context.TODO()) {
			var result bson.D
			if err := cursor.Decode(&result); err != nil {
				log.Fatal(err)
			}
			fmt.Println(result)
		}
		if err := cursor.Err(); err != nil {
			log.Fatal(err)
		}
	}

	// cursor all --> prints all documents
	fmt.Println("\nCursor All: ")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}

		defer cursor.Close(context.TODO())

		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}

	// count --> should print 6
	fmt.Println("\nCount: ")
	{
		count, err := coll.CountDocuments(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		fmt.Printf("Number of docs in tea collection: %d\n", count)
	}

	// distinct --> prints all the diff types of tea
	fmt.Println("\nDistinct: ")
	{
		results, err := coll.Distinct(context.TODO(), "type", bson.D{})
		if err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}

	// limit --> prints first 2 matched
	fmt.Println("\nLimit: ")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{}, options.Find().SetLimit(2))
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
	}

	// skip --> prints last 2 docs
	fmt.Println("\nSkip: ")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{}, options.Find().SetSkip(4))
		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}

	// sort --> sorts ratings in increasing order
	fmt.Println("\nSort: ")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{}, options.Find().SetSort(bson.D{{"rating", 1}}))
		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
		}
	}

	// project --> prints all docs without the vendr field and _id
	fmt.Println("\nProject: ")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{}, options.Find().SetProjection(bson.D{{"vendor", 0}, {"_id", 0}}))
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

	}

	// index
	fmt.Println("\nIndex: ")
	{
		model := mongo.IndexModel{Keys: bson.D{{"type", 1}, {"rating", -1}}}
		name, err := coll.Indexes().CreateOne(context.TODO(), model)
		if err != nil {
			panic(err)
		}

		fmt.Println("Name of Index Created: " + name)
	}

	// text search from exisiting example

	// watch
	fmt.Println("\nWatch: ")
	{
		pipeline := mongo.Pipeline{bson.D{{"$match", bson.D{{"operationType", "insert"}}}}}
		cs, err := coll.Watch(context.TODO(), pipeline)
		if err != nil {
			panic(err)
		}

		fmt.Println("Waiting For Change Events. Insesrt something in MongoDB!")

		for cs.Next(context.TODO()) {
			var event bson.D
			if err := cs.Decode(&event); err != nil {
				panic(err)
			}
			fmt.Println(event[3])
		}
	}
}
