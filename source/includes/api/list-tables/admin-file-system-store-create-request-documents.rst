.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - assignmentEnabled
     - boolean
     - Optional
     - Flag that indicates whether this file system store can be
       assigned backup jobs.

   * - id
     - string
     - Required
     - Unique identifier of this file system store.

   * - labels
     - array of strings
     - Optional
     - Tags to manage which :term:`backup jobs <backup job>` |onprem|
       can assign to which :opsmgr:`file system stores </reference/glossary/#std-term-File-System-Store>`.

       Setting these tags limits which backup jobs this file system
       store can process. If omitted, this file system store can only
       process backup jobs for projects that do not use labels to
       filter their jobs.

   * - loadFactor
     - number
     - Optional
     - Positive, non-zero integer that expresses how much backup work
       this :opsmgr:`snapshot store </reference/glossary/#std-term-snapshot-store>` should perform compared to another
       snapshot store. Set this option only if you're using more than
       one snapshot store.

       To learn more about :guilabel:`Load Factor`, see :ref:`Edit One Existing Blockstore <edit-blockstore>`.

   * - mmapv1CompressionSetting
     - string
     - Conditional
     - Compression setting if you use the MMAPv1 storage engine for
       your snaphots.

       |mms| accepts ``NONE`` or ``GZIP``.

       If the MongoDB runs |fcv-link| 4.2 or later, |service| ignores
       this setting.

       :gold:`IMPORTANT:` MongoDB removed support for the MMAPv1 storage engine in MongoDB 4.2.
       If you :doc:`edit your deployment's configuration </tutorial/edit-deployment>` 
       to change your storage engine to :ref:`storage-wiredtiger`, |mms|
       restarts the MongoDB processes.
       
   * - storePath
     - string
     - Required
     - Location where file system-based backups are stored on the
       file system store host.

   * - wtCompressionSetting
     - string
     - Conditional
     - Compression setting if you use the WiredTiger storage engine for
       your snaphots.

       |mms| accepts ``NONE`` or ``GZIP``.

       If the MongoDB runs |fcv-link| 4.2 or later, |service| ignores
       this setting.

