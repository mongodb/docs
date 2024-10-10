package common

import (
	"context"
	"log"

	"github.com/tmc/langchaingo/embeddings/huggingface"
)

func GetEmbeddings(documents []string) [][]float32 {
	hf, err := huggingface.NewHuggingface(
		huggingface.WithModel("mixedbread-ai/mxbai-embed-large-v1"),
		huggingface.WithTask("feature-extraction"))

	if err != nil {
		log.Fatalf("failed to connect to Hugging Face: %v", err)
	}

	embs, err := hf.EmbedDocuments(context.Background(), documents)

	if err != nil {
		log.Fatalf("failed to generate embeddings: %v", err)
	}

	return embs
}
