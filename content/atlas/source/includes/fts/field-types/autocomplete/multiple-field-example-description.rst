.. |sample-collection| replace:: ``sample_mflix.movies``

.. include:: /includes/fts/extracts/fts-index-definition-egs-intro.rst 

You can index a field as other types also by specifying the other 
types in the array. For example, the following index definition 
indexes the ``title`` field as the following types: 

- ``autocomplete`` type to support autocompletion for queries using
  the :ref:`autocomplete <autocomplete-ref>` operator.
- ``string`` type to support text search using operators such
  :ref:`text <text-ref>`, :ref:`phrase <phrase-ref>`, and so on.