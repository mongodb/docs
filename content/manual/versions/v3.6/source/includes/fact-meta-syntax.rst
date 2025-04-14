.. replace meta-object w :query:`$meta` or :expression:`$meta`

A |meta-object| expression has the following syntax:

.. code-block:: javascript

   { $meta: <metaDataKeyword> }

The |meta-object| expression can specify the following keyword
as the ``<metaDataKeyword>``:

.. only:: latex

   .. tabularcolumns:: |L|p{10cm}|L|

.. list-table::
   :header-rows: 1
   :widths: 25 50 25

   * - Keyword

     - Description

     - Sort Order

   * - ``"textScore"``

     - Returns the score associated with the corresponding
       :query:`$text` query for each matching document. The text score
       signifies how well the document matched the :ref:`search term or
       terms <match-operation-stemmed-words>`. If not used in
       conjunction with a :query:`$text` query, returns a score of
       |empty-value|.

     - Descending
