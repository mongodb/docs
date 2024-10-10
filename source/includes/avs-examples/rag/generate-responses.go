package main

import (
	"context"
	"fmt"
	"log"
	"rag-mongodb/common" // Module that contains the GetQueryResults function
	"strings"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/huggingface"
	"github.com/tmc/langchaingo/prompts"
)

func main() {
	ctx := context.Background()
	query := "AI Technology"
	documents := common.GetQueryResults(query)
	var textDocuments strings.Builder
	for _, doc := range documents {
		textDocuments.WriteString(doc.PageContent)
	}

	question := "In a few sentences, what are MongoDB's latest AI announcements?"
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

	opts := llms.CallOptions{
		Model:       "mistralai/Mistral-7B-Instruct-v0.3",
		MaxTokens:   150,
		Temperature: 0.1,
	}
	llm, err := huggingface.New(huggingface.WithModel("mistralai/Mistral-7B-Instruct-v0.3"))
	if err != nil {
		log.Fatalf("failed to initialize a Hugging Face LLM: %v", err)
	}
	completion, err := llms.GenerateFromSinglePrompt(ctx, llm, prompt, llms.WithOptions(opts))
	if err != nil {
		log.Fatalf("failed to generate a response from the prompt: %v", err)
	}
	response := strings.Split(completion, "\n\n")
	if len(response) == 2 {
		fmt.Printf("Prompt: %v\n\n", response[0])
		fmt.Printf("Response: %v\n", response[1])
	}
}
