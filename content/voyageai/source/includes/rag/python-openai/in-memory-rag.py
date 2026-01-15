import os
import numpy as np
from openai import OpenAI
from voyageai import Client as VoyageClient
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

# Initialize clients
voyage_client = VoyageClient(api_key=os.getenv("VOYAGE_API_KEY"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Configuration
VOYAGE_MODEL = "voyage-4-large"
OPENAI_MODEL = "gpt-4o"

# In-memory storage
documents = []
embeddings = []

# Generate embedding for a single text using Voyage AI
def get_embedding(text, input_type="document"):
    result = voyage_client.embed(
        [text],
        model=VOYAGE_MODEL,
        input_type=input_type
    )
    return np.array(result.embeddings[0], dtype=np.float32)

# Load PDF, split into chunks, and generate embeddings
def ingest_data():
    # Load the PDF
    loader = PyPDFLoader("https://investors.mongodb.com/node/13576/pdf")
    data = loader.load()

    # Split into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=400,
        chunk_overlap=20
    )
    chunks = text_splitter.split_documents(data)

    # Generate embeddings and store in memory
    for chunk in chunks:
        embedding = get_embedding(chunk.page_content)
        documents.append(chunk.page_content)
        embeddings.append(embedding)

# Retrieve top-k most relevant documents
def retrieve_documents(query, top_k=5):
    # Generate query embedding
    query_embedding = get_embedding(query, input_type="query")

    # Calculate similarity scores using dot product
    embeddings_array = np.array(embeddings)
    similarities = np.dot(embeddings_array, query_embedding)

    # Get top-k most similar documents
    top_indices = np.argsort(similarities)[::-1][:top_k]

    results = []
    for idx in top_indices:
        results.append({
            "text": documents[idx],
            "score": float(similarities[idx])
        })

    return results

# Generate response using retrieved documents and OpenAI
def generate_response(query):
    # Retrieve relevant documents
    retrieved_docs = retrieve_documents(query)

    # Combine retrieved documents into context
    context = "\n\n".join([doc["text"] for doc in retrieved_docs])

    # Create prompt with context
    prompt = f"""Based on the following information, answer the question.

Context:
{context}

Question: {query}

Answer:"""

    # Generate response with OpenAI
    response = openai_client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful assistant that answers questions based on the provided context."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content

if __name__ == "__main__":
    # Ingest data
    ingest_data()
    
    # Example query
    query = "What are MongoDB's latest AI announcements?"
    print(f"\nQuery: {query}\n")
    
    # Generate and print response
    response = generate_response(query)
    print(f"Response:\n{response}")
