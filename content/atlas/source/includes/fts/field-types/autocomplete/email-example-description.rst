The following index definition example uses the 
:ref:`sample_mflix.users <sample-mflix>` collection. The index
definition example indexes only the ``email`` field as the
``autocomplete`` type to support search-as-you-type queries against that
field using the :ref:`autocomplete <autocomplete-ref>` operator. The
index definition specifies the following:  

- Use the :ref:`keyword <ref-keyword-analyzer>` analyzer to 
  accept a string or array of strings as a parameter and index 
  them as a single term (token).
- Use the :ref:`nGram <nGram-tokenizer-ref>` tokenizer to 
  tokenize text into chunks, or "n-grams", of given sizes.
- Index a minimum of ``3`` characters per indexed sequence.
- Index a maximum of ``15`` characters per indexed sequence.
- Include diacritic marks in the index and query text.

You can also use the ``uaxUrlEmail`` tokenizer to tokenizes 
|url|\s and email addresses. To learn more, see 
:ref:`uaxUrlEmail-tokenizer-ref`.