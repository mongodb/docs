from ingest_data import ingest_data, create_vector_index
from generate_response import generate_response

def main():
    # Ask if user wants to ingest data
    ingest_choice = input("Do you want to ingest data into MongoDB? (Y/N): ").strip().upper()

    if ingest_choice == 'Y':
        ingest_data()

    # Create vector search index (checks if exists)
    create_vector_index()

    # Get user's question
    query = input("\nEnter your question: ").strip()

    # Generate response
    response = generate_response(query)
    print(f"\nAnswer: {response}")

if __name__ == "__main__":
    main()
    