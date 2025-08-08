This example performs the following actions:

- Configures an index for all document fields and a 
  single synonym mapping definition that uses the mapping 
  configured in the ``synonymous_terms`` collection.
- Uses the default analyzer, ``lucene.standard``, to analyze all 
  the fields.
- Enables synonyms from the ``synonymous_terms`` collection for queries on  
  fields analyzed with the ``lucene.standard`` analyzer.