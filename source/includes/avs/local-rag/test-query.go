package main

import (
	"fmt"
	"local-rag-mongodb/common" // Module that contains the RetrieveDocuments function
	"log"
	"strings"
)

func main() {
	query := "beach house"
	matchingDocuments := common.RetrieveDocuments(query)

	if matchingDocuments == nil {
		log.Fatal("No documents matched the query.\n")
	}

	var textDocuments strings.Builder
	for _, doc := range matchingDocuments {
		// Print the contents of the matching documents for verification
		fmt.Printf("Summary: %v\n", doc.Summary)
		fmt.Printf("Listing URL: %v\n", doc.ListingURL)
		fmt.Printf("Score: %v\n", doc.Score)

		// Build a single text string to use as the context for the QA
		textDocuments.WriteString("Summary: ")
		textDocuments.WriteString(doc.Summary)
		textDocuments.WriteString("\n")
		textDocuments.WriteString("Listing URL: ")
		textDocuments.WriteString(doc.ListingURL)
		textDocuments.WriteString("\n")
	}

	fmt.Printf("\nThe constructed context for the QA follows:\n\n")
	fmt.Printf(textDocuments.String())
}
