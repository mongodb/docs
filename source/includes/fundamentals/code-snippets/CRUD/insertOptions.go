package main

import (
	"fmt"

	"go.mongodb.org/mongo-driver/mongo/options"
)

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
