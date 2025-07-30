// Performs a bulk write that performs write operations
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

// start-book-struct
type Book struct {
	Title  string
	Author string
	Length int32
}

// end-book-struct

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

	// begin insertDocs
	coll := client.Database("db").Collection("books")
	docs := []interface{}{
		Book{Title: "My Brilliant Friend", Author: "Elena Ferrante", Length: 331},
		Book{Title: "Lucy", Author: "Jamaica Kincaid", Length: 103},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nInsertOneModel:\n")
	{
		// Creates instructions to insert documents describing books
		// begin bulk insert model
		models := []mongo.WriteModel{
			mongo.NewInsertOneModel().SetDocument(Book{Title: "Beloved", Author: "Toni Morrison", Length: 324}),
			mongo.NewInsertOneModel().SetDocument(Book{Title: "Outline", Author: "Rachel Cusk", Length: 258}),
		}
		// end bulk insert model

		// Runs the bulk write operation and prints the number of
		// inserted documents
		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents inserted: %d\n", results.InsertedCount)
	}

	fmt.Println("\nDocuments After Insert:\n")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []Book
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nReplaceOneModel:\n")
	{
		// Creates instructions to replace the first matching document
		// begin bulk replace model
		models := []mongo.WriteModel{
			mongo.NewReplaceOneModel().SetFilter(bson.D{{"title", "Lucy"}}).
				SetReplacement(Book{Title: "On Beauty", Author: "Zadie Smith", Length: 473}),
		}
		// end bulk replace model

		// Runs the bulk write operation and prints the number of
		// replaced documents
		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents replaced: %d\n", results.ModifiedCount)
	}

	fmt.Println("\nDocuments After Replace:\n")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []Book
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nUpdateOneModel:\n")
	{
		// Creates instructions to update the first matching document
		// begin bulk update model
		models := []mongo.WriteModel{
			mongo.NewUpdateOneModel().SetFilter(bson.D{{"author", "Elena Ferrante"}}).
				SetUpdate(bson.D{{"$inc", bson.D{{"length", -15}}}}),
		}
		// end bulk update model

		// Runs the bulk write operation and prints the number of
		// updated documents
		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %d\n", results.ModifiedCount)
	}

	fmt.Println("\nDocuments After Update:\n")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []Book
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
	}

	fmt.Println("\nDeleteManyModel:\n")
	{
		// Creates instructions to delete all documents that match the filter
		// begin bulk delete model
		models := []mongo.WriteModel{
			mongo.NewDeleteManyModel().SetFilter(bson.D{{"length", bson.D{{"$gt", 300}}}}),
		}
		// end bulk delete model

		// Runs the bulk write operation and prints the number of
		// deleted documents
		results, err := coll.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents deleted: %d\n", results.DeletedCount)
	}

	fmt.Println("\nDocuments After Delete:\n")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []Book
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
	}

	{
		client.Database("db").Collection("books").Drop(context.TODO())

		coll := client.Database("db").Collection("books")
		docs := []interface{}{
			Book{Title: "My Brilliant Friend", Author: "Elena Ferrante", Length: 331},
			Book{Title: "Lucy", Author: "Jamaica Kincaid", Length: 103},
		}

		result, err := coll.InsertMany(context.TODO(), docs)

		if err != nil {
			panic(err)
		}
		fmt.Printf("\n[Multiple Operations Example]\nNumber of documents inserted: %d\n", len(result.InsertedIDs))
	}

	fmt.Println("\nBulkOperation Example:\n")
	{
		// Creates instructions to make changes to documents describing
		// books
		// begin unordered
		models := []mongo.WriteModel{
			mongo.NewInsertOneModel().SetDocument(Book{Title: "Middlemarch", Author: "George Eliot", Length: 904}),
			mongo.NewInsertOneModel().SetDocument(Book{Title: "Pale Fire", Author: "Vladimir Nabokov", Length: 246}),
			mongo.NewReplaceOneModel().SetFilter(bson.D{{"title", "My Brilliant Friend"}}).
				SetReplacement(Book{Title: "Atonement", Author: "Ian McEwan", Length: 351}),
			mongo.NewUpdateManyModel().SetFilter(bson.D{{"length", bson.D{{"$lt", 200}}}}).
				SetUpdate(bson.D{{"$inc", bson.D{{"length", 10}}}}),
			mongo.NewDeleteManyModel().SetFilter(bson.D{{"author", bson.D{{"$regex", "Jam"}}}}),
		}

		// Specifies that the bulk write is unordered
		opts := options.BulkWrite().SetOrdered(false)

		// Runs the bulk write operation and prints a summary of the
		// data changes
		results, err := coll.BulkWrite(context.TODO(), models, opts)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents inserted: %d\n", results.InsertedCount)
		fmt.Printf("Number of documents replaced or updated: %d\n", results.ModifiedCount)
		fmt.Printf("Number of documents deleted: %d\n", results.DeletedCount)
		// end unordered
	}

	fmt.Println("\nDocuments After Bulk Operation:\n")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		defer cursor.Close(context.TODO())

		var results []Book
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
	}
}
