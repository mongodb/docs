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

       Starting in MongoDB 4.4, must be used in conjunction with a
       :query:`$text` query.

       In earlier versions, if not used in conjunction with a
       :query:`$text` query, returns a score of |empty-value|.

   * - ``"indexKey"``

     - Returns an index key for the document if a non-:doc:`text
       </core/index-text>` index is used. The ``{ $meta: "indexKey" }``
       expression is for debugging purposes only, and not for
       application logic, and is preferred over
       :method:`cursor.returnKey()`.

       .. versionadded:: 4.4


:atlas:`MongoDB Atlas Search </full-text-search>` provides
the following additional ``$meta`` keywords:

- :atlas:`"searchScore" </reference/full-text-search/scoring>`

- :atlas:`"searchHighlights"
  </reference/full-text-search/highlighting>`

- :atlas:`"searchScoreDetails" </atlas-search/score/get-details/>` 

Refer to the Atlas Search documentation for details.
