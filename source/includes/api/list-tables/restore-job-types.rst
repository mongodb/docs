.. list-table::
   :widths: 20 80
   :header-rows: 1
   :stub-columns: 1

   * - Job Type
     - Action

   * - ``automated``
     - |service| restores the snapshot corresponding to the
       ``snapshotId`` to the |service| cluster corresponding to
       the name ``targetClusterName`` in the |service| project
       corresponding to the ``targetGroupId``.

   * - ``download``
     - |service| generates and displays a |url| to download a
       ``.tar.gz`` of the snapshot corresponding to the
       ``snapshotId``. The contents of the ``tar.gz`` archive
       contain the data files for your |service| cluster.

       .. seealso::

          To learn more about manually restoring the downloaded
          data files, see
          :ref:`restore-cloud-provider-snapshot-download`.

       .. admonition:: Download Limitations
          :class: note

          Each {+cloud-backup+} can have one download at
          a time, and each
          :doc:`project </tutorial/manage-projects/>` can have
          a maximum of 20 downloads at a time.

   * - ``pointInTime``
     - |service| performs a
       :ref:`Point-in-Time restore <pit-restore>`.
