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
       can assign to which :opsmgr:`file system stores </reference/glossary/#std-term-File-System-Store>`.

   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - loadFactor
     - number
     - Positive, non-zero integer that expresses how much backup work
       this :opsmgr:`snapshot store </reference/glossary/#std-term-snapshot-store>` should perform compared to another
       snapshot store. Set this option only if you're using more than
       one snapshot store.

       To learn more about :guilabel:`Load Factor`, see :ref:`Edit One Existing Blockstore <edit-blockstore>`.

   * - mmapv1CompressionSetting
     - string
     - Compression setting if you use the MMAPv1 storage engine for
       your snaphots.

       |mms| may return ``NONE`` or ``GZIP``.

       If the MongoDB runs |fcv-link| 4.2 or later, |onprem| ignores
       this setting.

       :gold:`IMPORTANT:` MongoDB removed support for the MMAPv1 storage engine in MongoDB 4.2.
       If you :doc:`edit your deployment's configuration </tutorial/edit-deployment>` 
       to change your storage engine to :ref:`storage-wiredtiger`, |mms|
       restarts the MongoDB processes.

   * - storePath
     - string
     - System root-relative directory path where file system-based
       backups are stored on the file system store host.

   * - wtCompressionSetting
     - string
     - Compression setting if you use the WiredTiger storage engine for
       your snaphots.

       |mms| may return ``NONE`` or ``GZIP``.

       If the MongoDB runs |fcv-link| 4.2 or later, |onprem| ignores
       this setting.

