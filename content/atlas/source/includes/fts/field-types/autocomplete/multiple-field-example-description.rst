.. |sample-collection| replace:: ``sample_mflix.movies``

The following index definition example uses the 
|sample-collection| collection to index a field as multiple types. The
following index definition indexes the ``title`` field as the following
types:

- ``autocomplete`` type to support autocompletion for queries using
  the :ref:`autocomplete <autocomplete-ref>` operator.
- ``string`` type to support text search using operators such
  :ref:`text <text-ref>`, :ref:`phrase <phrase-ref>`, and so on.