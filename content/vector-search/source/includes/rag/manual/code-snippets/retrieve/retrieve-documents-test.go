package main

import (
	"fmt"
	"rag-mongodb/common" // Module that contains the GetQueryResults function
)

func main() {
	query := "AI Technology"
	documents := common.GetQueryResults(query)
	for _, doc := range documents {
		fmt.Printf("Text: %s \nScore: %v \n\n", doc.PageContent, doc.Score)
	}
}
