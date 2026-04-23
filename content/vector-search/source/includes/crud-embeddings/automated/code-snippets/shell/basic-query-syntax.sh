db.<COLLECTION-NAME>.aggregate([
  {
    "$vectorSearch": {
      "index": "<INDEX-NAME>", 
      "path": "<FIELD-NAME>", 
      "query": "<QUERY-TEXT>", 
      "numCandidates": <NUMBER-OF-CANDIDATES-TO-CONSIDER>, 
      "limit": <NUMBER-OF-DOCUMENTS-TO-RETURN>
    }
  }
])