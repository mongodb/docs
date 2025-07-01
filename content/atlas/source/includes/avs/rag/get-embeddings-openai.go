package common

import (
	"context"
	"log"

	"github.com/milosgajdos/go-embeddings/openai"
)

func GetEmbeddings(docs []string) [][]float64 {
	c := openai.NewClient()

	embReq := &openai.EmbeddingRequest{
		Input:          docs,
		Model:          openai.TextSmallV3,
		EncodingFormat: openai.EncodingFloat,
	}

	embs, err := c.Embed(context.Background(), embReq)
	if err != nil {
		log.Fatalf("failed to connect to OpenAI: %v", err)
	}

	var vectors [][]float64
	for _, emb := range embs {
		vectors = append(vectors, emb.Vector)
	}

	return vectors
}
