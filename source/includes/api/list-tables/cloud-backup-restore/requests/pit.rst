.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 10 10 65

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``deliveryType``
     - string
     - Required
     - Type of restore job to create. Accepted values include:

       .. include:: /includes/api/list-tables/restore-job-types.rst

   * - ``oplogTs``
     - integer
     - Conditional
     - |Epoch-time| from which to you want to restore this snapshot.
       This is the first part of an :ref:`Oplog <ref-atlas-oplog>`
       timestamp.

       Three conditions apply to this parameter:

       - Enable :ref:`{+PIT-Restore+} restores <pit-restore>` on your
         cluster.
       - Specify ``oplogInc``.
       - Specify either ``oplogTs`` and ``oplogInc`` or
         ``pointInTimeUTCSeconds``, but *not both*.

   * - ``oplogInc``
     - integer
     - Conditional
     - :ref:`Oplog <ref-atlas-oplog>` operation number from which to
       you want to restore this snapshot. This is the second part of
       an :ref:`Oplog <ref-atlas-oplog>` timestamp.

       Three conditions apply to this parameter:

       - Enable :ref:`{+PIT-Restore+} restores <pit-restore>` on your
         cluster.
       - Specify ``oplogTs``.
       - Specify either ``oplogTs`` and ``oplogInc`` or
         ``pointInTimeUTCSeconds``, but *not both*.

   * - | ``pointInTime``
       | ``UTCSeconds``
     - integer
     - Conditional
     - |Epoch-time| from which you want to restore this snapshot.

       Two conditions apply to this parameter:

       - Enable :ref:`{+PIT-Restore+} restores <pit-restore>` on your
         cluster.
       - Specify either ``pointInTimeUTCSeconds`` or ``oplogTs`` and
         ``oplogInc``, but *not both*.

   * - | ``target``
       | ``ClusterName``
     - string
     - Required
     - Name of the target |service| cluster to which the restore job
       restores the snapshot.

   * - | ``target``
       | ``GroupId``
     - string
     - Required
     - Unique identifier of the target |service| project for the
       specified ``targetClusterName``.
