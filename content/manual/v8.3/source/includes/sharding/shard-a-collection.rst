You can use the :binary:`~bin.mongosh` method :method:`sh.shardCollection()` to
shard a collection. To shard a collection, you must specify the full namespace 
of the collection that you want to shard and the shard key.

.. code-block:: javascript

   sh.shardCollection(<namespace>, <key>) // Optional parameters omitted

.. list-table::
   :widths: 20 80

   * - ``namespace``

     - Specify the full namespace of the collection that you want to
       shard (``"<database>.<collection>"``).

   * - ``key``

     - Specify a document ``{ <shard key field1>: <1|"hashed">, ... }``
       where

       - ``1`` indicates :ref:`range-based sharding <sharding-ranged>`

       - ``"hashed"`` indicates :ref:`hashed sharding <sharding-hashed>`.

For more information on the sharding method, see
:method:`sh.shardCollection()`.