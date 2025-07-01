// Implements RAG to answer questions on your data
optionsVector := []vectorstores.Option{
	vectorstores.WithScoreThreshold(0.60),
}

retriever := vectorstores.ToRetriever(&store, 1, optionsVector...)

prompt := prompts.NewPromptTemplate(
	`Answer the question based on the following context:
	{{.context}}
	Question: {{.question}}`,
	[]string{"context", "question"},
)

llmChain := chains.NewLLMChain(llm, prompt)
ctx := context.Background()

const question = "How do I get started painting?"

documents, err := retriever.GetRelevantDocuments(ctx, question)
if err != nil {
	log.Fatalf("Failed to retrieve documents: %v", err)
}

var contextBuilder strings.Builder
for i, document := range documents {
	contextBuilder.WriteString(fmt.Sprintf("Document %d: %s\n", i+1, document.PageContent))
}

contextStr := contextBuilder.String()

inputs := map[string]interface{}{
	"context":  contextStr,
	"question": question,
}

out, err := chains.Call(ctx, llmChain, inputs)
if err != nil {
	log.Fatalf("Failed to run LLM chain: %v", err)
}

log.Println("Source documents:")
for i, doc := range documents {
	log.Printf("Document %d: %s\n", i+1, doc.PageContent)
}

responseText, ok := out["text"].(string)
if !ok {
	log.Println("Unexpected response type")
	return
}

log.Println("Question:", question)
log.Println("Generated Answer:", responseText)