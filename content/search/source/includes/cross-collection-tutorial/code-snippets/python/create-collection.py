import pymongo
from datetime import datetime

# Connect to your MongoDB deployment
client = pymongo.MongoClient('<connection-string>')

# Set namespace
database = client['sample_supplies']
collection = database['purchaseOrders']

# Create first document
purchase_order1 = {
    'saleDate': datetime(2018, 1, 23, 21, 6, 49, 506000),
    'items': [
        {
            'name': 'printer paper',
            'tags': ['office', 'stationary'],
            'price': 40.01,
            'quantity': 2
        },
        {
            'name': 'notepad',
            'tags': ['office', 'writing', 'school'],
            'price': 35.29,
            'quantity': 2
        },
        {
            'name': 'pens',
            'tags': ['writing', 'office', 'school', 'stationary'],
            'price': 56.12,
            'quantity': 5
        },
        {
            'name': 'backpack',
            'tags': ['school', 'travel', 'kids'],
            'price': 77.71,
            'quantity': 2
        },
        {
            'name': 'notepad',
            'tags': ['office', 'writing', 'school'],
            'price': 18.47,
            'quantity': 2
        },
        {
            'name': 'envelopes',
            'tags': ['stationary', 'office', 'general'],
            'price': 19.95,
            'quantity': 8
        },
        {
            'name': 'envelopes',
            'tags': ['stationary', 'office', 'general'],
            'price': 8.08,
            'quantity': 3
        },
        {
            'name': 'binder',
            'tags': ['school', 'general', 'organization'],
            'price': 14.16,
            'quantity': 3
        }
    ],
    'storeLocation': 'Denver',
    'customer': {
        'gender': 'M',
        'age': 42,
        'email': 'cauho@witwuta.sv',
        'satisfaction': 4
    },
    'couponUsed': True,
    'purchaseMethod': 'Phone'
}

# Create second document
purchase_order2 = {
    'saleDate': datetime(2018, 1, 25, 10, 1, 2, 918000),
    'items': [
        {
            'name': 'envelopes',
            'tags': ['stationary', 'office', 'general'],
            'price': 8.05,
            'quantity': 10
        },
        {
            'name': 'binder',
            'tags': ['school', 'general', 'organization'],
            'price': 28.31,
            'quantity': 9
        },
        {
            'name': 'notepad',
            'tags': ['office', 'writing', 'school'],
            'price': 20.95,
            'quantity': 3
        },
        {
            'name': 'laptop',
            'tags': ['electronics', 'school', 'office'],
            'price': 866.5,
            'quantity': 4
        },
        {
            'name': 'notepad',
            'tags': ['office', 'writing', 'school'],
            'price': 33.09,
            'quantity': 4
        },
        {
            'name': 'printer paper',
            'tags': ['office', 'stationary'],
            'price': 37.55,
            'quantity': 1
        },
        {
            'name': 'backpack',
            'tags': ['school', 'travel', 'kids'],
            'price': 83.28,
            'quantity': 2
        },
        {
            'name': 'pens',
            'tags': ['writing', 'office', 'school', 'stationary'],
            'price': 42.9,
            'quantity': 4
        },
        {
            'name': 'envelopes',
            'tags': ['stationary', 'office', 'general'],
            'price': 16.68,
            'quantity': 2
        }
    ],
    'storeLocation': 'Seattle',
    'customer': {
        'gender': 'M',
        'age': 50,
        'email': 'keecade@hem.uy',
        'satisfaction': 5
    },
    'couponUsed': False,
    'purchaseMethod': 'Phone'
}

# Insert the documents
collection.insert_many([purchase_order1, purchase_order2])

print("Successfully inserted purchase order documents.")

# Query the new collection
results = collection.find().sort('saleDate', pymongo.DESCENDING)

print("\nQuery results:")
for doc in results:
    print(doc)
