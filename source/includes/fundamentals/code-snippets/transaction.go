// Perform a multi-document transaction by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/writeconcern"
)

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
	result, err := session.WithTransaction(context.TODO(), func(ctx context.Context) (interface{}, error) {
		result, err := coll.InsertMany(ctx, []interface{}{
			bson.D{{"title", "The Bluest Eye"}, {"author", "Toni Morrison"}},
			bson.D{{"title", "Sula"}, {"author", "Toni Morrison"}},
			bson.D{{"title", "Song of Solomon"}, {"author", "Toni Morrison"}},
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

	// MANUAL TRANSACTION EXAMPLE
	// uncomment this section to run this code

	// err = mongo.WithSession(context.TODO(), session, func(ctx mongo.SessionContext) error {
	// 	if err = session.StartTransaction(txnOptions); err != nil {
	// 		return err
	// 	}

	// 	docs := []interface{}{
	// 		bson.D{{"title", "The Year of Magical Thinking"}, {"author", "Joan Didion"}},
	// 		bson.D{{"title", "Play It As It Lays"}, {"author", "Joan Didion"}},
	// 		bson.D{{"title", "The White Album"}, {"author", "Joan Didion"}},
	// 	}
	// 	result, err := coll.InsertMany(ctx, docs)
	// 	if err != nil {
	// 		return err
	// 	}

	// 	if err = session.CommitTransaction(ctx); err != nil {
	// 		return err
	// 	}

	// 	fmt.Println(result.InsertedIDs)
	// 	return nil
	// })
	// if err != nil {
	// 	if err := session.AbortTransaction(context.TODO()); err != nil {
	// 		panic(err)
	// 	}
	// 	panic(err)
	// }
}
