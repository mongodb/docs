{
  "mappings": { 
  "dynamic": false,
  "fields": { 
    "funding_rounds": { 
      "type": "embeddedDocuments",
      "dynamic": true,
      "storedSource": {
        "include": ["round_code", "raised_currency_code", "raised_amount"] 
      }
    } 
  }
}