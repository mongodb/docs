To return matches for partial string queries, you can use one of the following operators:

- The :ref:`autocomplete <autocomplete-ref>` operator, which allows you to search the 
  specified fields for a word or phrase that contains the sequence of 
  characters that you specify with your query.

- The :ref:`phrase <phrase-ref>` operator, which allows you to search the 
  specified fields for documents that contain the terms in your query 
  string at the distance you specify between the terms.

- The :ref:`regex <regex-ref>` operator, which allows you to search the 
  specified fields for strings using regular expression.

- The :ref:`wildcard <wildcard-ref>` operator, which allows you to search the 
  specified fields using special characters in your query to match any 
  character.

You can also use the :ref:`text <text-ref>` operator with a custom analyzer 
for more fine-grained control over partial matching. To learn more, see 
:ref:`custom-analyzers`.

This tutorial takes you through the following steps: 

1. Set up a |fts| index on the ``plot`` field in the 
   ``sample_mflix.movies`` collection.
   
#. Run |fts| query for a partial string against the ``plot`` field in 
   the ``sample_mflix.movies`` collection using 
   :ref:`autocomplete <autocomplete-ref>`, :ref:`phrase <phrase-ref>`, :ref:`regex <regex-ref>`, and 
   :ref:`wildcard <wildcard-ref>` operators.

Before you begin, ensure that your cluster meets the following requirements.

.. |query-type| replace:: |fts|
.. |search-stage| replace:: :pipeline:`$search`

.. include:: /includes/fts/fts-tutorials-prereqs.rst
