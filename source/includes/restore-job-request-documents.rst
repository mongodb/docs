.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``delivery``
     - object
     - The method and details of how the restored snapshot data
       will be delivered.

   * - ``delivery.expirationHours``
     - number
     - The number of hours the download :abbr:`URL (Uniform Resource
       Locator)` is valid once the restore job is complete.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.maxDownloads``
     - number
     - The number of times the download :abbr:`URL (Uniform Resource
       Locator)` can be used. This must be ``1`` or greater.

       Only needed if ``"delivery.methodName" : "HTTP"``.

   * - ``delivery.methodName``
     - string
     - How the data will be delivered. Value may be one of the
       following:

       - ``AUTOMATED_RESTORE``
       - ``HTTP``

       .. note::

          If you specify ``AUTOMATED_RESTORE``, you must also include
          the ``delivery.targetGroupId`` parameter and either the 
          ``delivery.targetClusterName`` or ``delivery.targetClusterId``
          parameter in the request body.   In addition, the
          response shows the ``delivery.methodName`` as ``HTTP``. An
          automated restore uses the ``HTTP`` method to deliver the
          restore job to the target host.

   * - ``delivery.targetClusterId``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - The unique identifier of the target cluster. Use the ``clusterId``
       returned in the response body of the :doc:`Get All Snapshots </reference/api/snapshots-get-all>`
       and :doc:`Get a Snapshot </reference/api/snapshots-get-one>`
       endpoints. For use only with automated restore jobs.

       .. note::

          If backup is not enabled on the target cluster, the :doc:`Get All Snapshots </reference/api/snapshots-get-all>`
          endpoint returns an empty ``results`` array without ``clusterId``
          elements, and the :doc:`Get a Snapshot </reference/api/snapshots-get-one>`
          endpoint also does not return a ``clusterId`` element. Use the 
          ``delivery.targetClusterName`` parameter instead or enable backup
          on the target cluster.

   * - ``delivery.targetClusterName``
     - string
     - The name of the target cluster.
       
   * - ``delivery.targetGroupId``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - The unique identifer of the group that contains the target cluster.
       For use only with the automated restore jobs.

   * - ``snapshotId``
     - :ref:`ObjectId <document-bson-type-object-id>`
     - ID of the snapshot to restore.
