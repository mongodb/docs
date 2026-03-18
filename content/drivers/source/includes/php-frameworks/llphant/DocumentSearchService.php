<?php

namespace App;

use LLPhant\Embeddings\EmbeddingGenerator\EmbeddingGeneratorInterface;
use LLPhant\Embeddings\VectorStores\VectorStoreBase;
use LLPhant\Embeddings\Document;

class DocumentSearchService
{
    public function __construct(
        private EmbeddingGeneratorInterface $embeddingGenerator,
        private VectorStoreBase $vectorStore
    ) {
    }

    public function addDocument(string $title, string $content): void
    {
        // Generates embedding for the content
        $document = new Document();
        $document->content = $content;
        $document->formattedContent = $title;

        $this->embeddingGenerator->embedDocument($document);

        // Adds to vector store
        $this->vectorStore->addDocument($document);
    }

    public function searchDocuments(string $query, int $limit = 5): array
    {
        // Generates embedding for the query
        $queryDocument = new Document();
        $queryDocument->content = $query;
        $this->embeddingGenerator->embedDocument($queryDocument);

        // Searches using the embedding
        return $this->vectorStore->similaritySearch($queryDocument->embedding, $limit);
    }
}