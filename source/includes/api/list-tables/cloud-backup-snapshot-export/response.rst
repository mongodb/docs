.. list-table::
   :widths: 25 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``components`` 
     - array of documents 
     - *Returned only for sharded clusters.* 

       Export job details for each replica set in the sharded cluster.

   * - ``components.exportId``
     - string 
     - *Returned only for sharded clusters.* 

       Unique identifier of the export job for the replica set.

   * - ``components.replicaSetName`` 
     - string 
     - *Returned only for sharded clusters.* 

       Name of the replica set.

   * - ``createdAt``
     - string
     - |iso8601-time| when the export job was created.

   * - ``customData`` 
     - array of documents 
     - Custom data for the metadata file named ``.complete`` that 
       |service| uploads to the bucket when the export job finishes. 

   * - ``customData.key`` 
     - string 
     - Custom data specified as ``key`` in the key and value pair. 

   * - ``customData.value`` 
     - string 
     - Value for the key specified using ``customData.key``.

   * - ``errMsg``
     - string
     - Error message, only if the export job failed.

   * - ``exportBucketId``
     - string
     - Unique identifier of the bucket. 

   * - ``finishedAt`` 
     - string 
     - |iso8601-time| when the export job completes.

   * - ``id`` 
     - string 
     - Unique identifier of the export job.

   * - ``prefix`` 
     - string 
     - Full path on the cloud provider bucket to the folder where the 
       snapshot is exported. The path is in the following format: 

       .. code-block:: sh 
          :copyable: false 

          /exported_snapshots/{ORG-NAME}/{PROJECT-NAME}/{CLUSTER-NAME}/{SNAPSHOT-INITIATION-DATE}/{TIMESTAMP}

   * - ``snapshotId`` 
     - string 
     - Unique identifier of the snapshot.

   * - ``state`` 
     - string 
     - Status of the export job. Value can be one of the following: 

       - ``Queued`` - indicates that the export job is queued 
       - ``InProgress`` - indicates that the snapshot is being exported 
       - ``Successful`` - indicates that the export job has completed 
         successfully 
       - ``Failed`` - indicates that the export job has failed
