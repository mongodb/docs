// Perform a manual transaction by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/writeconcern"
)

// start-struct
type Book struct {
	Title  string `bson:"title"`
	Author string `bson:"author"`
}

// end-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	database := client.Database("db")
	coll := database.Collection("myColl")
	// start-session
	wc := writeconcern.Majority()
	txnOptions := options.Transaction().SetWriteConcern(wc)

	// Starts a session on the client
	session, err := client.StartSession()
	if err != nil {
		panic(err)
	}
	// Defers ending the session after the transaction is committed or ended
	defer session.EndSession(context.TODO())

	err = mongo.WithSession(context.TODO(), session, func(ctx context.Context) error {
		if err = session.StartTransaction(txnOptions); err != nil {
			return err
		}

		docs := []any{
			Book{Title: "The Year of Magical Thinking", Author: "Joan Didion"},
			Book{Title: "Play It As It Lays", Author: "Joan Didion"},
			Book{Title: "The White Album", Author: "Joan Didion"},
		}
		result, err := coll.InsertMany(ctx, docs)
		if err != nil {
			return err
		}

		if err = session.CommitTransaction(ctx); err != nil {
			return err
		}

		fmt.Println(result.InsertedIDs)
		return nil
	})
	if err != nil {
		if err := session.AbortTransaction(context.TODO()); err != nil {
			panic(err)
		}
		panic(err)
	}
	// end-session

}
