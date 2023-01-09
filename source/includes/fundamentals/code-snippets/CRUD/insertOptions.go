package main

import (
	"fmt"

	"go.mongodb.org/mongo-driver/mongo/options"
)

// start-book-struct
type Book struct {
	Title  string
	Author string
}

// end-book-struct

func insertManyOpts() {
	// begin insertManyOpts
	opts := options.InsertMany().SetBypassDocumentValidation(true).SetOrdered(false)
	// end insertManyOpts
	fmt.Println(opts)
}

func insertOneOpts() {
	// begin insertOneOpts
	opts := options.InsertOne().SetBypassDocumentValidation(true)
	// end insertOneOpts
	fmt.Println(opts)
}
