You can use the ``autocomplete`` data type to index text values for 
autocompletion. You can configure an ``autocomplete`` field to satisfy 
a variety of use cases. To learn more about the configuration options 
available in the ``autocomplete`` data type, such as tokenization 
strategy and diacritic folding, see 
:ref:`bson-data-types-autocomplete`. You can use the :ref:`autocomplete 
<autocomplete-ref>` operator to query only fields indexed using 
:ref:`bson-data-types-autocomplete`.

You can also use the ``autocomplete`` type to index:

- Fields whose value is an array of strings. To learn more, see 
  :ref:`fts-array-ref`.

- String fields inside an array of documents indexed as the
  :ref:`bson-data-types-embedded-documents` type.

The following limitations apply:

.. important::

   |fts| doesn't support indexing more than approximately two billion 
   index objects, where each indexed document counts as a single 
   object against this hard limit. Using the ``autocomplete`` type 
   could result in indexing objects in excess of this limit, which will 
   cause an index to transition to a failed state. If you have large 
   arrays that might generate two billion objects, we recommend 
   sharding {+clusters+} that contain indexes with ``autocomplete`` 
   field type.
