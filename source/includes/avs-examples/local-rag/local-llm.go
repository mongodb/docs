package main

import (
	"context"
	"local-rag-mongodb/common" // Module that contains the RetrieveDocuments function
	"log"
	"strings"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/ollama"
	"github.com/tmc/langchaingo/prompts"
)

func main() {
	// Retrieve documents from the collection that match the query
	const query = "beach house"
	matchingDocuments := common.RetrieveDocuments(query)

	if matchingDocuments == nil {
		log.Fatalf("no documents matched the query %q", query)
	}

	// Generate the text string from the matching documents to pass to the
	// LLM as context to answer the question
	var textDocuments strings.Builder
	for _, doc := range matchingDocuments {
		textDocuments.WriteString("Summary: ")
		textDocuments.WriteString(doc.Summary)
		textDocuments.WriteString("\n")
		textDocuments.WriteString("Listing URL: ")
		textDocuments.WriteString(doc.ListingURL)
		textDocuments.WriteString("\n")
	}

	// Have the LLM answer the question using the provided context
	llm, err := ollama.New(ollama.WithModel("mistral"))
	if err != nil {
		log.Fatalf("failed to initialize the Ollama Mistral model client: %v", err)
	}

	const question = `Can you recommend me a few AirBnBs that are beach houses?
		Include a link to the listings.`
	template := prompts.NewPromptTemplate(
		`Use the following pieces of context to answer the question at the end.
			Context: {{.context}}
			Question: {{.question}}`,
		[]string{"context", "question"},
	)

	prompt, err := template.Format(map[string]any{
		"context":  textDocuments.String(),
		"question": question,
	})

	ctx := context.Background()
	completion, err := llms.GenerateFromSinglePrompt(ctx, llm, prompt)
	if err != nil {
		log.Fatalf("failed to generate a response from the given prompt: %q", prompt)
	}

	log.Println("Response: ", completion)
}
