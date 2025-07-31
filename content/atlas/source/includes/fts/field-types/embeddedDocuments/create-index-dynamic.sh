
{
  "name": "default",
  "collectionName": "sales",
  "database": "sample_supplies",
  "type": "search",
  "definition": {
    "mappings": {
        "dynamic": true,
        "fields": {
        "items": {
            "dynamic": true,
            "type": "embeddedDocuments"
        },
        "purchaseMethod": {
            "type": "token"
        }
        }
    }
    }
}

