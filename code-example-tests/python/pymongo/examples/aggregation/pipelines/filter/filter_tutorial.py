from datetime import datetime
from pymongo import MongoClient

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        agg_db = client["agg_tutorials_db"]

        # :snippet-start: filter-tutorial-create-collection
        person_coll = agg_db["persons"]

        person_data = [
            {
                "person_id": "6392529400",
                "firstname": "Elise",
                "lastname": "Smith",
                "dateofbirth": datetime(1972, 1, 13, 9, 32, 7),
                "vocation": "ENGINEER",
                "address": {
                    "number": 5625,
                    "street": "Tipa Circle",
                    "city": "Wojzinmoj",
                },
            },
            {
                "person_id": "1723338115",
                "firstname": "Olive",
                "lastname": "Ranieri",
                "dateofbirth": datetime(1985, 5, 12, 23, 14, 30),
                "gender": "FEMALE",
                "vocation": "ENGINEER",
                "address": {
                    "number": 9303,
                    "street": "Mele Circle",
                    "city": "Tobihbo",
                },
            },
            {
                "person_id": "8732762874",
                "firstname": "Toni",
                "lastname": "Jones",
                "dateofbirth": datetime(1991, 11, 23, 16, 53, 56),
                "vocation": "POLITICIAN",
                "address": {
                    "number": 1,
                    "street": "High Street",
                    "city": "Upper Abbeywoodington",
                },
            },
            {
                "person_id": "7363629563",
                "firstname": "Bert",
                "lastname": "Gooding",
                "dateofbirth": datetime(1941, 4, 7, 22, 11, 52),
                "vocation": "FLORIST",
                "address": {
                    "number": 13,
                    "street": "Upper Bold Road",
                    "city": "Redringtonville",
                },
            },
            {
                "person_id": "1029648329",
                "firstname": "Sophie",
                "lastname": "Celements",
                "dateofbirth": datetime(1959, 7, 6, 17, 35, 45),
                "vocation": "ENGINEER",
                "address": {
                    "number": 5,
                    "street": "Innings Close",
                    "city": "Basilbridge",
                },
            },
            {
                "person_id": "7363626383",
                "firstname": "Carl",
                "lastname": "Simmons",
                "dateofbirth": datetime(1998, 12, 26, 13, 13, 55),
                "vocation": "ENGINEER",
                "address": {
                    "number": 187,
                    "street": "Hillside Road",
                    "city": "Kenningford",
                },
            },
        ]

        person_coll.insert_many(person_data)
        # :snippet-end:

        pipeline = []

        # :snippet-start: match
        pipeline.append({"$match": {"vocation": "ENGINEER"}})
        # :snippet-end:

        # :snippet-start: sort
        pipeline.append({"$sort": {"dateofbirth": -1}})
        # :snippet-end:

        # :snippet-start: limit
        pipeline.append({"$limit": 3})
        # :snippet-end:

        # :snippet-start: unset
        pipeline.append({"$unset": ["_id", "address"]})
        # :snippet-end:

        # :snippet-start: run-agg
        aggregation_result = person_coll.aggregate(pipeline)
        # :snippet-end:

        document_list = [] # :remove:
        for document in aggregation_result:
            print(document)
            document_list.append(document) # :remove:

        return document_list # :remove:

    finally:
        client.close()
