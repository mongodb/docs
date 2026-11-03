# start-imports
import argparse
import os
import time

import voyageai
from dotenv import load_dotenv
from openai import OpenAI
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

load_dotenv()

parser = argparse.ArgumentParser()
parser.add_argument("--query", default="something interesting")
parser.add_argument("--count", type=int, default=10)
args = parser.parse_args()
# end-imports


# start-create-clients
fireworks = OpenAI(
    base_url="https://api.fireworks.ai/inference/v1",
    api_key=os.environ["FIREWORKS_API_KEY"],
)
voyage = voyageai.Client()

mongo_client = MongoClient(os.environ["MONGODB_URI"])
collection = mongo_client["sample_mflix"]["movies"]

EMBEDDING_MODEL = "voyage-4"
RERANK_MODEL = "rerank-3"
CHAT_MODEL = "accounts/fireworks/models/gpt-oss-120b"
DIMENSIONS = 1024
# end-create-clients


# start-generate-embeddings
def get_embeddings(texts, input_type="document"):
    response = voyage.embed(
        texts, model=EMBEDDING_MODEL, input_type=input_type, output_dimension=DIMENSIONS
    )
    return response.embeddings


docs = list(
    collection.find(
        {"plot": {"$exists": True, "$ne": ""}}, {"_id": 1, "title": 1, "plot": 1}
    ).limit(50)
)

vectors = get_embeddings([doc["plot"] for doc in docs])

for doc, vector in zip(docs, vectors):
    collection.update_one({"_id": doc["_id"]}, {"$set": {"embedding": vector}})

print(f"Embedded {len(docs)} movies.")
# end-generate-embeddings


# start-create-index
index = SearchIndexModel(
    definition={
        "fields": [
            {
                "type": "vector",
                "path": "embedding",
                "numDimensions": DIMENSIONS,
                "similarity": "cosine",
            }
        ]
    },
    name="movie_vector_index",
    type="vectorSearch",
)
collection.create_search_index(model=index)

print("Waiting for the index to build...")
while not any(
    idx.get("queryable")
    for idx in collection.list_search_indexes("movie_vector_index")
):
    time.sleep(5)

print("Index is ready.")
# end-create-index


# start-vector-search
def vector_search(query, limit=5):
    query_vector = get_embeddings([query], input_type="query")[0]
    pipeline = [
        {
            "$vectorSearch": {
                "index": "movie_vector_index",
                "path": "embedding",
                "queryVector": query_vector,
                "numCandidates": limit * 20,
                "limit": limit,
            }
        },
        {
            "$project": {
                "_id": 0,
                "title": 1,
                "plot": 1,
                "score": {"$meta": "vectorSearchScore"},
            }
        },
    ]
    return list(collection.aggregate(pipeline))


print("\nVector search results:")
for movie in vector_search(args.query, limit=args.count):
    print(f'{movie["score"]:.3f}  {movie["title"]}')
# end-vector-search


# start-rerank
def rerank(query, movies, top_n=5):
    candidate_texts = [f'{m["title"]}: {m["plot"]}' for m in movies]
    reranking = voyage.rerank(query, candidate_texts, model=RERANK_MODEL, top_k=top_n)
    return [movies[result.index] for result in reranking.results]


def retrieve(query, top_n=5):
    return rerank(query, vector_search(query, limit=top_n * 4), top_n=top_n)


print("\nReranked, precise results:")
for movie in retrieve(args.query, top_n=args.count):
    print(movie["title"])
# end-rerank


# start-generate-response
def answer(question):
    context = "\n\n".join(f'{m["title"]}: {m["plot"]}' for m in retrieve(question))
    response = fireworks.chat.completions.create(
        model=CHAT_MODEL,
        messages=[
            {
                "role": "system",
                "content": "Answer using only the movies in the context. "
                "If the context doesn't contain the answer, say so.",
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion: {question}",
            },
        ],
    )
    return response.choices[0].message.content


print("\nRecommendation:")
print(answer(f"Recommend a movie about {args.query}, and explain why."))
# end-generate-response
