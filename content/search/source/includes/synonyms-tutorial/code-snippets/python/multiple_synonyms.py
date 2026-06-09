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
        
        # Get the transport_synonyms collection
        transport_collection = database["transport_synonyms"]
        
        # Create and insert the first transport document - equivalent mapping
        doc1 = {
            "mappingType": "equivalent",
            "synonyms": ["car", "vehicle", "automobile"]
        }
        
        transport_collection.insert_one(doc1)
        
        # Create and insert the second transport document - explicit mapping
        doc2 = {
            "mappingType": "explicit",
            "input": ["boat"],
            "synonyms": ["boat", "vessel", "sail"]
        }
        
        transport_collection.insert_one(doc2)
        
        # Create the attire_synonyms collection
        try:
            database.create_collection("attire_synonyms")
        except Exception as e:
            # Collection may already exist, which is fine
            print(f"Note: {str(e)}")
        
        # Get the attire_synonyms collection
        attire_collection = database["attire_synonyms"]
        
        # Create and insert the first attire document - equivalent mapping
        doc3 = {
            "mappingType": "equivalent",
            "synonyms": ["dress", "apparel", "attire"]
        }
        
        attire_collection.insert_one(doc3)
        
        # Create and insert the second attire document - explicit mapping
        doc4 = {
            "mappingType": "explicit",
            "input": ["hat"],
            "synonyms": ["hat", "fedora", "headgear"]
        }
        
        attire_collection.insert_one(doc4)
        
        print("Synonyms collections successfully created and populated.")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)
    finally:
        # Close the connection
        client.close()

if __name__ == "__main__":
    main()
