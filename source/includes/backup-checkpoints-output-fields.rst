.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``results``
     - object array
     - Includes one object for each item detailed in the
       `results array`_ section.

   * - ``links``
     - object array
     - Includes one or more :ref:`links <api-linking>` to 
       sub-resources and/or related resources. The relations between 
       URLs are explained in the `Web Linking Specification
       <http://tools.ietf.org/html/rfc5988>`__.

   * - ``totalCount``
     - number
     - Count of the total number of items in the result set.

``results`` array
~~~~~~~~~~~~~~~~~

.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description
       
   * - ``clusterId``
     - string
     - The ID of the cluster containing the checkpoint.
       
   * - ``completed``
     - BSON timestamp
     - The point in time the checkpoint completed and the balancer
       restarted.

   * - ``groupId``
     - string
     - The unique identifier of the project that owns the checkpoint.

   * - ``id``
     - string
     - The checkpoint ID.
       
   * - ``links``
     - array of objects
     - An array of links to sub-resources
       and/or related resources. The relations between URLs are
       explained in the `Web Linking Specification
       <http://tools.ietf.org/html/rfc5988>`_.

   * - ``parts``
     - array of objects
     - The individual parts that comprise the complete checkpoint. There
       will be one element for each shard plus one element for the config
       servers.

   * - ``parts[i].replicaSetName``
     - string
     - The name of the replica set. Not present for config servers.

   * - ``parts[i].shardName``
     - string
     - The name of the shard.

   * - ``parts[i].tokenDiscovered``
     - Boolean
     - Indicates whether the token exists.

   * - ``parts[i].tokenTimestamp``
     - document
     - The timestamp of the checkpoint token entry in the :term:`oplog`,
       as specified by the entry’s ``ts`` field. The ``ts`` field is a
       :manual:`BSON </reference/bson-types>` timestamp and has two components: 

       - timestamp: the value in seconds since the Unix epoch
         
       - increment: an incrementing ordinal for operations within a
         given second

   * - ``parts[i].typeName``
     - string
     - The type of server represented by the part. Possible values are:

       - ``REPLICA_SET``, which indicates the part is a shard.
       - ``CONFIG_SERVER``

   * - ``restorable``
     - Boolean
     - Indicates whether the checkpoint can be used for a restore.

   * - ``started``
     - BSON timestamp
     - The point in time |service| stopped the balancer and began the checkpoint.

   * - ``timestamp``
     - BSON timestamp
     - The point in time the checkpoint restores to.
