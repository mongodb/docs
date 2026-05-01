The :pipeline:`$vectorSearch` ``filter`` option matches |bson|
{+avs-filter-types+}.

You **must** index the fields that you want to filter your data by as the 
:ref:`filter <avs-types-vector-search>` type in a :ref:`vectorSearch
<avs-types-vector-search>` type index definition. Filtering your data is 
useful to narrow the scope of your semantic search and ensure that not
all vectors are considered for comparison. 

{+avs+} supports the :pipeline:`$vectorSearch` ``filter`` option for
the following {+mql+} :manual:`operators </reference/mql/query-operators/>`:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Type
     - {+mql+} operator

   * - Equality
     - :query:`$eq`, :query:`$ne`

   * - Range
     - :query:`$gt`, :query:`$lt`, :query:`$gte`, :query:`$lte`

   * - In set
     - :query:`$in`, :query:`$nin`

   * - Existence
     - :query:`$exists`

   * - Logical
     - :query:`$not`, :query:`$nor`, :expression:`$and`, :expression:`$or`

.. note::

   The :pipeline:`$vectorSearch` ``filter`` option doesn't support
   other :ref:`query operators <query-predicates-ref>`,
   :ref:`aggregation pipeline operators <aggregation-expressions>`, or 
   :ref:`{+fts+} operators <operators-ref>`.