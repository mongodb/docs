// Deletes documents that match a filter by using the Go driver
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
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
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

	client.Database("db").Collection("books").Drop(context.TODO())

	// begin insertDocs
	coll := client.Database("db").Collection("books")
	docs := []interface{}{
		Book{Title: "Atonement", Author: "Ian McEwan", Length: 351},
		Book{Title: "My Brilliant Friend", Author: "Elena Ferrante", Length: 331},
		Book{Title: "Lucy", Author: "Jamaica Kincaid", Length: 103},
		Book{Title: "Outline", Author: "Rachel Cusk", Length: 258},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nDelete Many:\n")
	{
		// Creates a filter to match documents where the "length" value
		// is greater than 300
		// begin deleteMany
		filter := bson.D{{"length", bson.D{{"$gt", 300}}}}

		// Sets options for the delete operation to use the index on the
		// "_id" field
		opts := options.Delete().SetHint(bson.D{{"_id", 1}})

		// Deletes matching documents and prints the number of deleted
		// documents
		result, err := coll.DeleteMany(context.TODO(), filter, opts)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents deleted: %d\n", result.DeletedCount)
		// end deleteMany
	}
}
