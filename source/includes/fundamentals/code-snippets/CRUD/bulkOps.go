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

// start-structs
type Book struct {
	Title  string
	Author string
	Length int32
}

type Poem struct {
	Title  string
	Author string
	Year   int32
}

// end-structs

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
	bookColl := client.Database("db").Collection("books")
	poemColl := client.Database("db").Collection("poems")

	books := []interface{}{
		Book{Title: "My Brilliant Friend", Author: "Elena Ferrante", Length: 331},
		Book{Title: "Lucy", Author: "Jamaica Kincaid", Length: 103},
	}

	poems := []interface{}{
		Poem{Title: "Song of Myself", Author: "Walt Whitman", Year: 1855},
		Poem{Title: "The Raincoat", Author: "Ada Limon", Year: 2018},
	}

	bookInsert, err := bookColl.InsertMany(context.TODO(), books)
	poemInsert, err := poemColl.InsertMany(context.TODO(), poems)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of book documents inserted: %d\n", len(bookInsert.InsertedIDs))
	fmt.Printf("Number of poem documents inserted: %d\n", len(poemInsert.InsertedIDs))

	fmt.Println("\nInsertOneModel:\n")
	{
		// Creates instructions to insert documents describing books
		// begin bulk insert model collection
		models := []mongo.WriteModel{
			mongo.NewInsertOneModel().SetDocument(Book{Title: "Beloved", Author: "Toni Morrison", Length: 324}),
			mongo.NewInsertOneModel().SetDocument(Book{Title: "Outline", Author: "Rachel Cusk", Length: 258}),
		}
		// end bulk insert model collection

		// begin bulk insert model client
		bookInsertDoc := Book{Title: "Parable of the Sower", Author: "Octavia E. Butler", Length: 320}
		poemInsertDoc := Poem{Title: "Fame is a fickle food", Author: "Emily Dickinson", Year: 1659}

		writes := []mongo.ClientBulkWrite{
			{"db", "books", mongo.NewClientInsertOneModel().SetDocument(bookInsertDoc)},
			{"db", "poems", mongo.NewClientInsertOneModel().SetDocument(poemInsertDoc)},
		}
		// end bulk insert model client

		// Runs the bulk write operation and prints the number of
		// inserted documents
		results, err := bookColl.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents inserted: %d\n", results.InsertedCount)

		_, err = client.BulkWrite(context.TODO(), writes)
		if err != nil {
			panic(err)
		}
	}

	fmt.Println("\nDocuments After Insert:\n")
	{
		cursor, err := bookColl.Find(context.TODO(), bson.D{})
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
		// begin bulk replace model collection
		models := []mongo.WriteModel{
			mongo.NewReplaceOneModel().SetFilter(bson.D{{"title", "Lucy"}}).
				SetReplacement(Book{Title: "On Beauty", Author: "Zadie Smith", Length: 473}),
		}
		// end bulk replace model collection

		// begin bulk replace model client
		writes := []mongo.ClientBulkWrite{
			{"db", "books", mongo.NewClientReplaceOneModel().
				SetFilter(bson.D{{"title", "Lucy"}}).
				SetReplacement(Book{Title: "On Beauty", Author: "Zadie Smith", Length: 473})},
			{"db", "poems", mongo.NewClientReplaceOneModel().
				SetFilter(bson.D{{"title", "Song of Myself"}}).
				SetReplacement(Poem{Title: "America", Author: "Walt Whitman", Year: 1888})},
		}
		// end bulk replace model client

		// Runs the bulk write operation and prints the number of
		// replaced documents
		results, err := bookColl.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents replaced: %d\n", results.ModifiedCount)

		_, err = client.BulkWrite(context.TODO(), writes)
		if err != nil {
			panic(err)
		}
	}

	fmt.Println("\nDocuments After Replace:\n")
	{
		cursor, err := bookColl.Find(context.TODO(), bson.D{})
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
		// begin bulk update model collection
		models := []mongo.WriteModel{
			mongo.NewUpdateOneModel().SetFilter(bson.D{{"author", "Elena Ferrante"}}).
				SetUpdate(bson.D{{"$inc", bson.D{{"length", -15}}}}),
		}
		// end bulk update model collection

		// begin bulk update model client
		writes := []mongo.ClientBulkWrite{
			{"db", "books", mongo.NewClientUpdateOneModel().
				SetFilter(bson.D{{"author", "Elena Ferrante"}}).
				SetUpdate(bson.D{{"$inc", bson.D{{"length", -15}}}})},
			{"db", "poems", mongo.NewClientUpdateOneModel().
				SetFilter(bson.D{{"author", "Ada Limon"}}).
				SetUpdate(bson.D{{"author", "Ada Limón"}})},
		}
		// end bulk update model client

		// Runs the bulk write operation and prints the number of
		// updated documents
		results, err := bookColl.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %d\n", results.ModifiedCount)

		_, err = client.BulkWrite(context.TODO(), writes)
		if err != nil {
			panic(err)
		}
	}

	fmt.Println("\nDocuments After Update:\n")
	{
		cursor, err := bookColl.Find(context.TODO(), bson.D{})
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
		// begin bulk delete model collection
		models := []mongo.WriteModel{
			mongo.NewDeleteManyModel().SetFilter(bson.D{{"length", bson.D{{"$gt", 300}}}}),
		}
		// end bulk delete model collection

		// begin bulk delete model client
		writes := []mongo.ClientBulkWrite{
			{"db", "books", mongo.NewClientDeleteOneModel().
				SetFilter(bson.D{{"length", 103}})},
			{"db", "poems", mongo.NewClientDeleteOneModel().
				SetFilter(bson.D{{"year", 1855}})},
		}
		// end bulk delete model client

		// Runs the bulk write operation and prints the number of
		// deleted documents
		results, err := bookColl.BulkWrite(context.TODO(), models)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents deleted: %d\n", results.DeletedCount)

		_, err = client.BulkWrite(context.TODO(), writes)
		if err != nil {
			panic(err)
		}
	}

	fmt.Println("\nDocuments After Delete:\n")
	{
		cursor, err := bookColl.Find(context.TODO(), bson.D{})
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

		bookColl := client.Database("db").Collection("books")
		docs := []interface{}{
			Book{Title: "My Brilliant Friend", Author: "Elena Ferrante", Length: 331},
			Book{Title: "Lucy", Author: "Jamaica Kincaid", Length: 103},
		}

		result, err := bookColl.InsertMany(context.TODO(), docs)

		if err != nil {
			panic(err)
		}
		fmt.Printf("\n[Multiple Operations Example]\nNumber of documents inserted: %d\n", len(result.InsertedIDs))
	}

	fmt.Println("\nBulkOperation Example:\n")
	{
		// Creates instructions to make changes to documents describing
		// books
		// begin unordered collection
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
		results, err := bookColl.BulkWrite(context.TODO(), models, opts)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents inserted: %d\n", results.InsertedCount)
		fmt.Printf("Number of documents replaced or updated: %d\n", results.ModifiedCount)
		fmt.Printf("Number of documents deleted: %d\n", results.DeletedCount)
		// end unordered collection
	}

	fmt.Println("\nDocuments After Bulk Operation:\n")
	{
		cursor, err := bookColl.Find(context.TODO(), bson.D{})
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
	fmt.Println("\nClient BulkOperation Example:\n")
	{
		// Creates instructions to make changes to documents describing
		// books
		// begin unordered client
		writes := []mongo.ClientBulkWrite{
			{"db", "books", mongo.NewClientInsertOneModel().
				SetDocument(Book{Title: "Middlemarch", Author: "George Eliot", Length: 904})},
			{"db", "poems", mongo.NewClientInsertOneModel().
				SetDocument(Poem{Title: "Mad Girl's Love Song", Author: "Sylvia Plath", Year: 1953})},
			{"db", "poems", mongo.NewClientUpdateOneModel().
				SetFilter(bson.D{{"title", "The Raincoat"}}).
				SetUpdate(bson.D{{"title", "The Conditional"}})},
			{"db", "books", mongo.NewClientReplaceOneModel().
				SetFilter(bson.D{{"title", "My Brilliant Friend"}}).
				SetReplacement(Book{Title: "The Story of a New Name", Author: "Elena Ferrante", Length: 480})},
		}
		opts := options.ClientBulkWrite().SetOrdered(false)

		results, err := client.BulkWrite(context.TODO(), writes, opts)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents inserted: %d\n", results.InsertedCount)
		fmt.Printf("Number of documents replaced or updated: %d\n", results.ModifiedCount)
		// end unordered client
	}
}
