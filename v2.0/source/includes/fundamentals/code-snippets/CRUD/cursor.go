// Retrieves documents referenced by a cursor by using the Go driver
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

// start-sample-struct
type MyStruct struct {
	MyProperty string
}

// end-sample-struct

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

	coll := client.Database("db").Collection("sample_data")
	docs := []interface{}{
		MyStruct{MyProperty: "abc"},
		MyStruct{MyProperty: "def"},
		MyStruct{MyProperty: "ghi"},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("Cursor Elements:")
	{
		opts := options.Find().SetBatchSize(3)
		cursor, err := coll.Find(context.TODO(), bson.D{}, opts)
		if err != nil {
			panic(err)
		}

		// begin close
		defer cursor.Close(context.TODO())
		// end close

		for cursor.Next(context.TODO()) {
			// begin current
			fmt.Println(cursor.Current)
			// end current
			// begin remaining batch length
			fmt.Println(cursor.RemainingBatchLength())
			// end remaining batch length
			// begin id
			fmt.Println(cursor.ID())
			// end id
			// begin err
			fmt.Println(cursor.Err())
			// end err
		}
	}

	fmt.Println("Cursor.All():")
	{
		// Retrieves documents and references them in a cursor
		// begin cursor def
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		// end cursor def

		defer cursor.Close(context.TODO())

		// Retrieves all documents from the cursor at once by unpacking
		// the cursor into a slice and printing the slice
		// begin cursor all
		var results []MyStruct
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Printf("%+v\n", result)
		}
		// end cursor all
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
		// begin cursor next
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
		// end cursor next
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
		// begin cursor try next
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
		// end cursor try next
	}
}
