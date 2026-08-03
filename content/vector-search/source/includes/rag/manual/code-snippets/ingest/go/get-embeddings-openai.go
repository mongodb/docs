package common

import (
	"context"
	"fmt"
	"log"
	"os"

	openai "github.com/openai/openai-go/v3"
	"github.com/openai/openai-go/v3/option"
)

func GetEmbeddings(data []string) [][]float64 {
	ctx := context.Background()

	c := openai.NewClient(
		option.WithAPIKey(os.Getenv("OPENAI_API_KEY")),
	)

	resp, err := c.Embeddings.New(ctx, openai.EmbeddingNewParams{
		Model: openai.EmbeddingModelTextEmbedding3Large,
		Input: openai.EmbeddingNewParamsInputUnion{
			OfArrayOfStrings: data,
		},
	})
	if err != nil {
		log.Fatal(err)
	}

	embeddings := make([][]float64, len(resp.Data))
	for i, d := range resp.Data {
		embeddings[i] = d.Embedding
	}

	fmt.Printf("Generated %d embeddings\n", len(embeddings))
	fmt.Printf("Embedding length: %d\n", len(embeddings[0]))

	return embeddings
}
