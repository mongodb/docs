//	:replace-start: {
//	  "terms": {
//	    "package local_rag": "package common"
//	  }
//	}
//
// :snippet-start: get-embeddings
package local_rag

import (
	"context"
	"log"

	"github.com/tmc/langchaingo/llms/ollama"
)

func GetEmbeddings(documents []string) [][]float32 {
	llm, err := ollama.New(ollama.WithModel("nomic-embed-text"))
	if err != nil {
		log.Fatalf("failed to connect to ollama: %v", err)
	}

	ctx := context.Background()
	embs, err := llm.CreateEmbedding(ctx, documents)
	if err != nil {
		log.Fatalf("failed to create ollama embedding: %v", err)
	}

	return embs
}

// :snippet-end:
// :replace-end:
