.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag that indicates whether this file system store can be
       assigned backup jobs.

   * - id
     - string
     - Unique identifier of this file system store.

   * - labels
     - array of strings
     - Tags that manage which :term:`backup jobs <backup job>` |onprem|
       can assign to which :term:`file system stores <file system
       store>`.

   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - loadFactor
     - number
     - Positive, non-zero integer that expresses how much backup work
       this :term:`snapshot store` should perform compared to another
       snapshot store. Set this option only if you're using more than
       one snapshot store.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see
          :doc:`Edit an Existing Blockstore </tutorial/manage-blockstore-storage>`

   * - mmapv1CompressionSetting
     - string
     - Compression setting if you use the MMAPv1 storage engine for
       your snaphots.

       |mms| may return ``NONE`` or ``GZIP``.

       If the MongoDB runs |fcv-link| 4.2 or later, |service| ignores
       this setting.

       .. important::

          .. include:: /includes/fact-mmapv1-deprecated.rst

   * - storePath
     - string
     - System root-relative directory path where file system-based
       backups are stored on the file system store host.

   * - wtCompressionSetting
     - string
     - Compression setting if you use the WiredTiger storage engine for
       your snaphots.

       |mms| may return ``NONE`` or ``GZIP``.

       If the MongoDB runs |fcv-link| 4.2 or later, |service| ignores
       this setting.

