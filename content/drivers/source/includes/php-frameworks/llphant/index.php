<?php

require_once 'vendor/autoload.php';

use App\DocumentSearchService;
use LLPhant\Embeddings\EmbeddingGenerator\VoyageAI\Voyage3EmbeddingGenerator;
use LLPhant\Embeddings\VectorStores\MongoDB\MongoDBVectorStore;
use LLPhant\VoyageAIConfig;
use MongoDB\Client;
use Symfony\Component\Dotenv\Dotenv;

$dotenv = new Dotenv();
$dotenv->load(__DIR__ . '/.env');
$client = new Client($_ENV['MONGODB_URI']);

// Creates the embedding generator
$config = new VoyageAIConfig(apiKey: $_ENV['VOYAGE_AI_API_KEY']);
$embeddingGenerator = new Voyage3EmbeddingGenerator($config);

// Creates the vector store
$vectorStore = new MongoDBVectorStore(
    $client,
    'test',
    'searchable_restaurants',
    'restaurant_vector_idx'
);

$searchService = new DocumentSearchService($embeddingGenerator, $vectorStore);

// Sample restaurant documents to add
$restaurantDocs = [
    [
        "name" => "Le Bernardin",
        "description" => "Elite French restaurant offers chef Eric Ripert's refined seafood, expert service & luxurious decor. Fine dining establishment known for exceptional French cuisine with a focus on seafood. Upscale, formal atmosphere with premium pricing. Reservations required. Dress code enforced."
    ],
    [
        "name" => "Au Za'atar",
        "description" => "Polished eatery offering shawarma, mezze, and Lebanese dishes, plus outdoor dining. Features authentic shawarma, falafel, hummus, and fresh mezze platters. Relaxed atmosphere with both indoor and outdoor seating. Moderate pricing, family-friendly."
    ],
    [
        "name" => "Bacaro",
        "description" => "Candlelit basement eatery serving pastas & Venetian small plates alongside Italian wines. Intimate Italian restaurant featuring traditional Venetian cicchetti (small plates) and handmade pasta. Romantic ambiance with dim lighting. Extensive Italian wine selection. Cozy, casual-upscale atmosphere. Moderate to high pricing."
    ],
    [
        "name" => "Levant",
        "description" => "Cozy eatery serving Middle Eastern comfort food, with healthy options, and coffee. Offers authentic Lebanese, Syrian, and Mediterranean dishes. Known for fresh, healthy options including vegetarian and vegan choices. Warm, welcoming atmosphere. Great for lunch or casual dinner. Affordable pricing. Popular items include falafel wraps, tabbouleh, and grilled kebabs."
    ],
    [
        "name" => "Hangawi",
        "description" => "Upscale menu of creative, gourmet Korean fare in a tranquil space where shoes come off at the door. Fine dining Korean restaurant specializing in traditional temple cuisine. Entirely vegetarian menu featuring organic ingredients. Unique cultural experience with floor seating and traditional Korean decor. Peaceful, meditative atmosphere. Upscale pricing. Reservations recommended."
    ]
];

echo "Adding sample restaurant documents...\n";
foreach ($restaurantDocs as $restaurant) {
    $searchService->addDocument($restaurant['name'], $restaurant['description']);
    echo "Added: {$restaurant['name']}\n";
}

echo "\nPerforming semantic search...\n";
$searchQuery = "High-end restaurant with unique options and a romantic atmosphere";
echo "Query: $searchQuery\n\n";

$results = $searchService->searchDocuments($searchQuery, 3);

echo "Search Results:\n";
foreach ($results as $index => $result) {
    echo ($index + 1) . ". {$result->formattedContent}\n";
    echo "   Description: " . substr($result->content, 0, 100) . "...\n\n";
}