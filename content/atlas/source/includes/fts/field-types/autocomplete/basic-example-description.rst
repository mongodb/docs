.. |sample-collection| replace:: ``sample_mflix.movies``

.. include:: /includes/fts/extracts/fts-index-definition-egs-intro.rst 

The following index definition example indexes only the ``title``
field as the ``autocomplete`` type to support search-as-you-type
queries against that field using the :ref:`autocomplete <autocomplete-ref>`
operator. The index definition also specifies the following: 

- Use the :ref:`standard <ref-standard-analyzer>` analyzer to divide
  text values into terms based on word boundaries.
- Use the ``edgeGram`` tokenization strategy to index characters
  starting at the left side of the words .
- Index a minimum of ``3`` characters per indexed sequence.
- Index a maximum of ``5`` characters per indexed sequence.
- Include diacritic marks in the index and query text.