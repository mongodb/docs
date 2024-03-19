Starting in MongoDB 5.3, you can create a collection with a **clustered
index**. Clustered indexes are stored in the same :ref:`WiredTiger
<storage-wiredtiger>` file as the collection. The resulting collection
is called a :ref:`clustered collection <clustered-collections>`.

The ``clusteredIndex`` field has the following syntax:

.. code-block:: javascript
   :copyable: false

   clusteredIndex: {
      key: <object>,
      unique: <boolean>,
      name: <string>
   }

.. list-table::
   :header-rows: 1

   * - Field
     - Description

   * - ``key``
     - Required. The clustered index key field. Must be set to ``{ _id:
       1 }``. The default value for the ``_id`` field is an
       automatically generated unique :ref:`object identifier
       <objectid>`, but you can set your own :ref:`clustered index key
       values <clustered-collections-clustered-index-key-values>`.

   * - ``unique``
     - Required. Must be set to ``true``. A unique index indicates the
       collection will not accept inserted or updated documents where
       the clustered index key value matches an existing value in the
       index.

   * - ``name``
     - Optional. A name that uniquely identifies the clustered index.

.. versionadded:: 5.3
