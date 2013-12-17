.. replace meta-object w :query:`$meta` or :expression:`$meta`

A |meta-object| expression has the following syntax:

.. code-block:: javascript

   { <projectedFieldName>: { $meta: <metaDataKeyword> } }

The |meta-object| expression can specify the following keyword
as the ``<metaDataKeyword>``:

.. list-table::
   :header-rows: 1
   :widths: 15 50 15

   * - Keyword

     - Description

     - Sort Order

   * - ``"textScore"``

     - Returns the score associated with the corresponding
       query:`$text` query for each matching document. The
       text score signifies how well the document matched the
       stemmed term or terms. If not used in conjunction with a
       query:`$text` query, returns a score of ``0.0``

     - Descending
