import pymongo
from datetime import datetime, timezone  # Import timezone for tzinfo=timezone.utc

# Connect to your Atlas cluster
client = pymongo.MongoClient("<connection-string>")

# Define pipeline
pipeline = [{
    '$search': {
        'index': 'facet-tutorial',
        'facet': {
            'operator': {
                'near': {
                    'path': 'released',
                    'origin': datetime(1921, 11, 1, 0, 0, 0, tzinfo=timezone.utc),  # Corrected timezone
                    'pivot': 7776000000
                }
            },
            'facets': {
                'genresFacet': {
                    'type': 'string', 'path': 'genres'
                },
                'yearFacet': {
                    'type': 'number', 'path': 'year', 'boundaries': [1910, 1920, 1930, 1940]
                }
            }
        }
    }
}, {
    '$facet': {
        'meta': [
            {'$replaceWith': '$$SEARCH_META'},
            {'$limit': 1}
        ]
    }
}, {
    '$set': {
        'meta': {'$arrayElemAt': ['$meta', 0]}
    }
}]
# Run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# Print results
for doc in result:
    print(doc)
