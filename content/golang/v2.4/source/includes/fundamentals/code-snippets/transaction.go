// Perform a multi-document transaction by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readconcern"
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

	// Inserts multiple documents into a collection within a transaction,
	// then commits or ends the transaction
	result, err := session.WithTransaction(context.TODO(), func(ctx context.Context) (any, error) {
		result, err := coll.InsertMany(ctx, []any{
			Book{Title: "The Bluest Eye", Author: "Toni Morrison"},
			Book{Title: "Sula", Author: "Toni Morrison"},
			Book{Title: "Song of Solomon", Author: "Toni Morrison"},
		})
		return result, err
	}, txnOptions)
	// end-session

	fmt.Printf("Inserted _id values: %v\n", result)

	// begin-session-txn-options
	txnOpts := options.Transaction().SetReadConcern(readconcern.Majority())
	sessOpts := options.Session().SetDefaultTransactionOptions(txnOpts)
	session, err := client.StartSession(sessOpts)
	if err != nil {
		return err
	}
	// end-session-txn-options
}
