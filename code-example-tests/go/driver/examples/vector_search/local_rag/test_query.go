//	:replace-start: {
//	  "terms": {
//	    "package local_rag": "package main",
//	    "RetrieveDocuments(query)": "common.RetrieveDocuments(query)"
//	  }
//	}
//
// :snippet-start: test-query
package local_rag

import (
	"fmt"
	//:uncomment-start:
	//"local-rag-mongodb/common" // Module that contains the RetrieveDocuments function
	//:uncomment-end:
	"log"
	"strings"
)

// :uncomment-start:
// func main() {
// :uncomment-end:
func RunTestQuery() string { // :remove:
	query := "beach house"
	matchingDocuments := RetrieveDocuments(query)

	if matchingDocuments == nil {
		log.Fatal("No documents matched the query.\n")
	}

	var textDocuments strings.Builder
	for _, doc := range matchingDocuments {

		summary := doc.PageContent
		listingURL, ok := doc.Metadata["listing_url"].(string)
		if !ok {
			log.Fatal("expected listing_url to be in document metadata and to be a string")
		}
		score := doc.Score

		// Print the contents of the matching documents for verification
		fmt.Printf("Summary: %v\n", summary)
		fmt.Printf("Listing URL: %v\n", listingURL)
		fmt.Printf("Score: %v\n", score)

		// Build a single text string to use as the context for the QA
		textDocuments.WriteString("Summary: ")
		textDocuments.WriteString(summary)
		textDocuments.WriteString("\n")
		textDocuments.WriteString("Listing URL: ")
		textDocuments.WriteString(listingURL)
		textDocuments.WriteString("\n")
	}

	fmt.Printf("\nThe constructed context for the QA follows:\n\n")
	fmt.Print(textDocuments.String())
	return textDocuments.String() // :remove:
}

// :snippet-end:
// :replace-end:
