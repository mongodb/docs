// Sets options for insert operations by using the Go driver
package main

import (
	"fmt"

	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-book-struct
type Book struct {
	Title  string
	Author string
}

// end-book-struct

func main() {
	insertManyOpts()
	insertOneOpts()
}

func insertManyOpts() {
	// Sets options to bypass document validation and specify an
	// unordered insert when inserting multiple documents
	// begin insertManyOpts
	opts := options.InsertMany().SetBypassDocumentValidation(true).SetOrdered(false)
	// end insertManyOpts
	fmt.Println(opts)
}

func insertOneOpts() {
	// Sets options to bypass document validation when inserting a
	// single document
	// begin insertOneOpts
	opts := options.InsertOne().SetBypassDocumentValidation(true)
	// end insertOneOpts
	fmt.Println(opts)
}
