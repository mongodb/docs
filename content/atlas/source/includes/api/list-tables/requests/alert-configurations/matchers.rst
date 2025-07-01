.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1

   * - | matchers
       | .[n].fieldName
     - string
     - Required
     - Name of the field in the target object that you wanted this
       configuration to match. |service| accepts the following values:

       .. list-table::
          :widths: 33 33 33
          :header-rows: 1

          * - Host
            - Replica set
            - Sharded cluster

          * -
              | ``TYPE_NAME``
              | ``HOSTNAME``
              | ``PORT``
              | ``HOSTNAME_AND_PORT``
              | ``REPLICA_SET_NAME``

            -
              | ``REPLICA_SET_NAME``
              | ``SHARD_NAME``
              | ``CLUSTER_NAME``

            -
              | ``CLUSTER_NAME``
              | ``SHARD_NAME``

   * - | matchers
       | .[n].operator
     - string
     - Optional
     - Comparison operator to apply when checking the current metric
       value against **matcher.[n].value**. |service| accepts the
       following values:

       .. hlist::
          :columns: 2

          - ``EQUALS``
          - ``NOT_EQUALS``
          - ``CONTAINS``
          - ``NOT_CONTAINS``
          - ``STARTS_WITH``
          - ``ENDS_WITH``
          - ``REGEX``

   * - | matchers
       | .[n].value
     - string
     - Optional
     - Value against which the specified operator compares.

       If you set **matchers.[n].fieldName** to ``TYPE_NAME``, you can
       match on the following values:

       .. hlist::
          :columns: 2

          - ``PRIMARY``
          - ``SECONDARY``
          - ``STANDALONE``
          - ``CONFIG``
          - ``MONGOS``
