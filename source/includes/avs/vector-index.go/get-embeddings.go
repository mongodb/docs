package common

import (
	"context"
	"log"

	"github.com/tmc/langchaingo/llms/ollama"
)

func GetEmbeddings(documents []string) [][]float32 {
	llm, err := ollama.New(ollama.WithModel("nomic-embed-text"))
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()
	embs, err := llm.CreateEmbedding(ctx, documents)
	if err != nil {
		log.Fatal(err)
	}

	return embs
}
