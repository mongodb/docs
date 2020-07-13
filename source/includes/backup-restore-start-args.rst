.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Argument
     - Description 

   * - ``automated``
     - |service| restores the snapshot corresponding to ``snapshotId`` 
       to the |service| cluster and project specified by
       ``targetClusterId`` and ``targetGroupId``.

   * - ``pointInTime``
     - |service| performs a :atlas:`Continuous Cloud Backup restore  
       </backup/cloud-backup/overview/#continuous-cloud-backups>`.

   * - ``download``
     - |service| generates and displays a |url| to download a
       ``.tar.gz`` of the snapshot corresponding to the
       ``snapshotId``. The contents of the ``tar.gz`` archive
       contain the data files for your |service| cluster.

       .. seealso::

          To learn more about manually restoring the downloaded
          data files, see
          :atlas:`Manual Restore One Snapshot </backup/archive/archive-one-snapshot/>`.

       .. admonition:: Download Limitations
          :class: note

          Each cloud backup can have one download at a time, and each
          :atlas:`project </tutorial/manage-projects/>` can have
          a maximum of 20 downloads at a time.
