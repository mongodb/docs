//	:replace-start: {
//	  "terms": {
//	    "utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")"
//	  }
//	}
//
// Retrieves documents referenced by a cursor by using the Go driver
package cursor

import (
	"context"
	"fmt"
	"log"

	"driver-examples/utils"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// :snippet-start: struct
type MyStruct struct {
	MyProperty string
}

// :snippet-end:

// Cursor demonstrates accessing data referenced by a cursor and returns
// the documents retrieved with the All() method for test validation.
func Cursor() []MyStruct {
	// :snippet-start: connect
	var uri string
	if uri = utils.GetConnectionString(); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("db").Collection("sample_data")
	// :snippet-end:
	// :snippet-start: insert
	docs := []any{
		MyStruct{MyProperty: "Beach House"},
		MyStruct{MyProperty: "Office"},
		MyStruct{MyProperty: "Bungalow"},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	// :snippet-end:

	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("Cursor Elements:")
	{
		opts := options.Find().SetBatchSize(3)
		cursor, err := coll.Find(context.TODO(), bson.D{}, opts)
		if err != nil {
			panic(err)
		}

		// :snippet-start: close
		defer cursor.Close(context.TODO())
		// :snippet-end:

		for cursor.Next(context.TODO()) {
			fmt.Println(cursor.Current)
			fmt.Println(cursor.RemainingBatchLength())
			fmt.Println(cursor.ID())
			fmt.Println(cursor.Err())
		}
	}

	fmt.Println("Cursor.All():")
	{
		// Retrieves documents and references them in a cursor
		// :snippet-start: cursor-def
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		// :snippet-end:

		defer cursor.Close(context.TODO())

		// Retrieves all documents from the cursor at once by unpacking
		// the cursor into a slice and printing the slice
		// :snippet-start: cursor-all
		var results []MyStruct
		if err := cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Printf("%+v\n", result)
		}
		// :snippet-end:
	}

	fmt.Println("Cursor.Next():")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}

		defer cursor.Close(context.TODO())

		// Retrieves documents from the cursor individually by iterating
		// through the cursor and printing each document
		// :snippet-start: cursor-next
		for cursor.Next(context.TODO()) {
			var result MyStruct
			if err := cursor.Decode(&result); err != nil {
				log.Fatal(err)
			}
			fmt.Printf("%+v\n", result)
		}
		if err := cursor.Err(); err != nil {
			log.Fatal(err)
		}
		// :snippet-end:
	}

	fmt.Println("Cursor.TryNext():")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}

		defer cursor.Close(context.TODO())

		// Retrieves documents from the tailable cursor individually by iterating
		// through the cursor and printing each document
		// :snippet-start: cursor-try-next
		for {
			if cursor.TryNext(context.TODO()) {
				var result MyStruct
				if err := cursor.Decode(&result); err != nil {
					log.Fatal(err)
				}
				fmt.Printf("%+v\n", result)
				continue
			}

			if err := cursor.Err(); err != nil {
				log.Fatal(err)
			}
			if cursor.ID() == 0 {
				break
			}
		}
		// :snippet-end:
	}

	// :remove-start:
	// Re-reads all documents so the test has a deterministic return value
	// to validate against the expected output file.
	verifyCursor, err := coll.Find(context.TODO(), bson.D{})
	if err != nil {
		panic(err)
	}
	defer verifyCursor.Close(context.TODO())

	var allResults []MyStruct
	if err = verifyCursor.All(context.TODO(), &allResults); err != nil {
		panic(err)
	}
	return allResults
	// :remove-end:
}

// :replace-end:
