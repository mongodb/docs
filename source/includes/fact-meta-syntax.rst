.. replace meta-object w :query:`$meta` or :expression:`$meta`

A |meta-object| expression has the following syntax:

.. code-block:: javascript

   { $meta: <metaDataKeyword> }

The |meta-object| expression can specify the following values as the
``<metaDataKeyword>``:

.. list-table::
   :header-rows: 1
   :widths: 20 70

   * - Keyword

     - Description
     

   * - ``"textScore"``

     - Returns the score associated with the corresponding
       :query:`$text` query for each matching document. The text score
       signifies how well the document matched the :ref:`search term or
       terms <match-operation-stemmed-words>`. 

       ``{ $meta: "textScore" }`` must be used in conjunction with a
       ``$text`` query.

       In earlier versions, if not used in conjunction with a
       ``$text`` query, returns a score of |empty-value|.

       ``$text`` provides text query capabilities for self-managed (non-Atlas) 
       deployments. For data hosted on MongoDB Atlas, MongoDB offers an improved 
       full-text query solution, :atlas:`Atlas Search </atlas-search/>`.

   * - ``"indexKey"``

     - Returns an index key for the document if a non-:ref:`text
       <index-type-text>` index is used. The ``{ $meta: "indexKey" }``
       expression is for debugging purposes only, and not for
       application logic, and is preferred over
       :method:`cursor.returnKey()`.

:atlas:`MongoDB Atlas Search </full-text-search>` provides
additional ``$meta`` keywords, such as:

- :atlas:`"searchScore" </atlas-search/scoring>`
- :atlas:`"searchHighlights" </atlas-search/highlighting>`
- :atlas:`"searchSequenceToken" </atlas-search/paginate-results>`
  (*Available starting in MongoDB 7.0.5 and 6.0.13*)

Refer to the Atlas Search documentation for details.
