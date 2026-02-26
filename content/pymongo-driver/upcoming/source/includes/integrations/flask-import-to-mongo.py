from pymongo import MongoClient
import json
from datetime import datetime

def import_json_to_mongo(db_name, collection_name, 
                        json_path):
    client = MongoClient("mongodb://localhost:27017/")
    db = client[db_name]

    def convert_date(data):
        # Update 'date_posted' field to datetime object
        for item in data:
            if 'date_posted' in item:
                item['date_posted'] = datetime.strptime(
                    item['date_posted'], 
                    '%Y-%m-%d %H:%M:%S.%f')
        return data

    with open(json_path, 'r') as f:
        data = json.load(f)
        data = convert_date(data)
        db[collection_name].insert_many(data)

    client.close()

if __name__ == "__main__":
    db_name = 'blogdb'
    collection_name = 'posts'
    json_path = 'flask-mongo/post.json'
    import_json_to_mongo(db_name, collection_name, 
                        json_path)
