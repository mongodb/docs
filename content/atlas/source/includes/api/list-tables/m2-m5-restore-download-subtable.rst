.. list-table::
   :widths: 20 80
   :header-rows: 1
   :stub-columns: 1 

   * - Value
     - Description

   * - ``RESTORE``
     - |service| automatically restores the snapshot with
       ``snapshotId`` to the |service| cluster with name
       ``targetDeploymentItemName`` in the |service| project with 
       ``targetProjectId``.

   * - ``DOWNLOAD``
     - |service| provides a URL to download a ``.tar.gz`` of the
       snapshot with ``snapshotId``. The contents of the archive
       contain the data files for your |service| cluster. 
       To learn more about manually restoring the downloaded
       data  files, see
       :ref:`restore-cloud-provider-snapshot-download`.