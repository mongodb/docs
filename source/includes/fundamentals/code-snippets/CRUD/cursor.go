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

	client.Database("tea").Collection("ratings").Drop(context.TODO())

	coll := client.Database("tea").Collection("ratings")
	docs := []interface{}{
		bson.D{{"type", "Masala"}, {"rating", 10}},
		bson.D{{"type", "Earl Grey"}, {"rating", 5}},
		bson.D{{"type", "Assam"}, {"rating", 7}},
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
		// begin find
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}
		// end find

		defer cursor.Close(context.TODO())
		
		// begin cursor all
		var results []bson.D
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			fmt.Println(result)
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

		// begin cursor next
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
		// end cursor next
	}

	fmt.Println("Cursor.TryNext():")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}

		defer cursor.Close(context.TODO())

		// begin cursor try next
		for {
			if cursor.TryNext(context.TODO()) {
				var result bson.D
				if err := cursor.Decode(&result); err != nil {
					log.Fatal(err)
				}
				fmt.Println(result)
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
