.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``delivery``
     - object
     - Required
     - Method and details of how the restored :term:`snapshot` data
       is delivered.

   * - | ``delivery``
       | ``.methodName``
     - string
     - Required
     - Means by which |mms| delivers the data. Set to
       ``AUTOMATED_RESTORE``.

       .. note::

          The response shows the ``"delivery.methodName" : "HTTP"``. An
          automated restore uses the ``HTTP`` method to deliver the
          restore job to the target host.

       .. include:: /includes/note-scp-removed.rst

   * - | ``delivery``
       | ``.targetClusterId``
     - string
     - Required
     - Unique identifier of the target cluster. Use the ``clusterId``
       returned in the response body of the
       :doc:`Get All Snapshots </reference/api/snapshots/get-all-snapshots-for-one-cluster>`
       and :doc:`Get a Snapshot </reference/api/snapshots/get-all-snapshots-for-one-cluster>`
       endpoints.

       .. note::

          If backup is not enabled on the target cluster, the
          :doc:`Get All Snapshots </reference/api/snapshots/get-all-snapshots-for-one-cluster/>`
          endpoint returns an empty ``results`` array without
          ``clusterId`` elements, and the
          :doc:`Get a Snapshot </reference/api/snapshots/get-all-snapshots-for-one-cluster>`
          endpoint also does not return a ``clusterId`` element.

   * - | ``delivery``
       | ``.targetGroupId``
     - string
     - Required
     - Unique identifier of the project that contains the destination
       cluster for the restore job.

   * - ``pointInTimeUTCMillis``
     - long
     - Required
     - |epoch-time-ms| that represents the point in time to which your
       data will be restored. This timestamp must be within last 24
       hours of the current time.

       If you provide this setting, this endpoint restores all data up
       to this :term:`Point in Time <point-in-time restore>`  to the
       database you specified in the ``delivery`` object.


