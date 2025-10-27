package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"rag-mongodb/common" // Module that contains the GetQueryResults function
	"strings"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/prompts"
)

func main() {
	ctx := context.Background()
	question := "In a few sentences, what are MongoDB's latest AI announcements?"
	documents := common.GetQueryResults(question)
	var textDocuments strings.Builder
	for _, doc := range documents {
		textDocuments.WriteString(doc.PageContent)
	}

	template := prompts.NewPromptTemplate(
		`Answer the following question based on the given context.
			Question: {{.question}}
			Context: {{.context}}`,
		[]string{"question", "context"},
	)
	prompt, err := template.Format(map[string]any{
		"question": question,
		"context":  textDocuments.String(),
	})

	// Loads OpenAI API key from environment
	openaiApiKey := os.Getenv("OPENAI_API_KEY")
	if openaiApiKey == "" {
		log.Fatal("Set your OPENAI_API_KEY environment variable in the .env file")
	}

	// Creates an OpenAI LLM client
	llm, err := openai.New(
		openai.WithToken(openaiApiKey),
		openai.WithModel("gpt-4o"),
	)
	if err != nil {
		log.Fatalf("Failed to create an LLM client: %v", err)
	}
	completion, err := llms.GenerateFromSinglePrompt(ctx, llm, prompt)
	if err != nil {
		log.Fatalf("failed to generate a response from the prompt: %v", err)
	}
	fmt.Println(completion)
}
