This example performs the following actions:

- Configures an index with a single text field and a single 
  synonym mapping definition that uses the mapping configured in 
  the ``synonymous_terms`` collection.
- Analyzes the ``plot`` field with the ``lucene.english`` 
  analyzer.
- Enables synonyms from the ``synonymous_terms`` collection for queries  
  on fields analyzed with the ``lucene.english`` analyzer.