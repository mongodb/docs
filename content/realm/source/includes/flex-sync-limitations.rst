Indexed Queryable Fields Subscription Requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Adding an :ref:`indexed queryable field <fs-indexed-queryable-fields>` to 
your App can improve performance for simple queries on data that is strongly
partitioned. For example, an app where queries strongly map data to a device, 
store, or user, such as ``user_id == $0, “641374b03725038381d2e1fb”``, is 
a good candidate for an indexed queryable field. However, an indexed 
queryable field has specific requirements for use in a query subscription:

- The indexed queryable field must be used in every subscription query. It 
  cannot be missing from the query.
- The indexed queryable field must use an ``==`` or ``IN`` comparison 
  against a constant at least once in the subscription query. For example,
  ``user_id == $0, "641374b03725038381d2e1fb"`` or 
  ``store_id IN $0, {1,2,3}``.

You can optionally include an ``AND`` comparison as long as the indexed
queryable field is directly compared against a constant using ``==`` or ``IN``
at least once. For example, ``store_id IN {1,2,3} AND region=="Northeast"``
or ``store_id == 1 AND (active_promotions < 5 OR num_employees < 10)``.

*Invalid* Flexible Sync queries on an indexed queryable field include queries 
where:

- The indexed queryable field does not use ``AND`` with the rest of the query.
  For example ``store_id IN {1,2,3} OR region=="Northeast"`` is invalid
  because it uses ``OR`` instead of ``AND``. Similarly, 
  ``store_id == 1 AND active_promotions < 5 OR num_employees < 10`` is invalid
  because the ``AND`` only applies to the term next to it, not the entire
  query.
- The indexed queryable field is not used in an equality operator. For example
  ``store_id > 2 AND region=="Northeast"`` is invalid because it uses only 
  the ``>`` operator with the indexed queryable field and does not have an 
  equality comparison.
- The query is missing the indexed queryable field entirely. For example, 
  ``region=="Northeast`` or ``truepredicate`` are invalid because they do
  not contain the indexed queryable field.

Unsupported Query Operators in Flexible Sync
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Flexible Sync has some limitations when using RQL operators. When you 
write the :ref:`query subscription <flexible-sync-query-subscription>` 
that determines which data to sync, the server does not support these
query operators. However, you can still use the full range of RQL features
to query the synced data set in the client application.

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Operator Type
     - Unsupported Operators

   * - Aggregate Operators
     - ``@avg``, ``@count``, ``@max``, ``@min``, ``@sum``

   * - Query Suffixes
     - ``DISTINCT``, ``SORT``, ``LIMIT``

Case insensitive queries (``[c]``) cannot use indexes effectively.
As a result, case insensitive queries are not recommended, since they could lead to
performance problems.

Flexible Sync only supports ``@count`` for array fields.

List Queries
~~~~~~~~~~~~

Flexible Sync supports querying lists using the ``IN`` operator.

You can query a list of constants to see if it contains the value of a
queryable field:

.. code-block:: javascript
   
   // Query a constant list for a queryable field value
   "priority IN { 1, 2, 3 }"

If a queryable field has an array value, you can query to see if it
contains a constant value:

.. code-block:: javascript
   
   // Query an array-valued queryable field for a constant value
   "'comedy' IN genres"

.. warning::

   You **cannot** compare two lists with each other in a Flexible Sync query.
   Note that this is valid Realm Query Language syntax outside of Flexible Sync queries.

   .. code-block:: javascript
      :copyable: false

      // Invalid Flexible Sync query. Do not do this!
      "{'comedy', 'horror', 'suspense'} IN genres"
      
      // Another invalid Flexible Sync query. Do not do this!
      "ANY {'comedy', 'horror', 'suspense'} != ANY genres"

Embedded or Linked Objects
~~~~~~~~~~~~~~~~~~~~~~~~~~

Flexible Sync does not support querying on properties in Embedded Objects 
or links. For example, ``obj1.field == "foo"``.

Query Size Limit
~~~~~~~~~~~~~~~~

The **size limit** for any given query subscription in your subscription set is **256 kB**.
Exceeding this limit results in a :ref:`LimitsExceeded Error<flexible-sync-errors>`. 
