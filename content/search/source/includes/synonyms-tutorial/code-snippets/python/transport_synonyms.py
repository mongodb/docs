from pymongo import MongoClient
import sys

def main():
    try:
        # Connect to MongoDB
        client = MongoClient("<connection-string>")
        
        # Get the sample_mflix database
        database = client["sample_mflix"]
        
        # Create the transport_synonyms collection
        try:
            database.create_collection("transport_synonyms")
        except Exception as e:
            # Collection may already exist, which is fine
            print(f"Note: {str(e)}")
        
        # Get the collection
        collection = database["transport_synonyms"]
        
        # Create and insert the first document - equivalent mapping
        doc1 = {
            "mappingType": "equivalent",
            "synonyms": ["car", "vehicle", "automobile"]
        }
        
        collection.insert_one(doc1)
        
        # Create and insert the second document - explicit mapping
        doc2 = {
            "mappingType": "explicit",
            "input": ["boat"],
            "synonyms": ["boat", "vessel", "sail"]
        }
        
        collection.insert_one(doc2)
        
        print("Synonyms collections successfully created and populated.")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)
    finally:
        # Close the connection
        client.close()

if __name__ == "__main__":
    main()
