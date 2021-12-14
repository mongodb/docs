The :ref:`autocomplete <autocomplete-ref>` operator performs a search 
for a word or phrase that contains a sequence of characters from an 
incomplete input string. You can use the ``autocomplete`` operator with
search-as-you-type applications to predict words with increasing
accuracy as characters are entered in your application's search
field. ``autocomplete`` returns results that contain predicted words
based on the tokenization strategy specified in the index definition
for autocompletion. The fields that you intend to query with the 
``autocomplete`` operator must be indexed with the  
:ref:`bson-data-types-autocomplete` data type in the collection's 
index definition. 

.. note:: 

   |fts| might return inaccurate results for queries with more than 
   three words in a single string.
