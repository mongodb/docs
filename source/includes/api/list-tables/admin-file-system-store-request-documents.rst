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

   * - labels
     - array of strings
     - Optional
     - Tags to manage which :term:`backup jobs <backup job>` |onprem|
       can assign to which :term:`file system stores <file system
       store>`.

       Setting these tags limits which backup jobs this file system
       store can process. If omitted, this file system store can only
       process backup jobs for projects that do not use labels to
       filter their jobs.

   * - loadFactor
     - number
     - Optional
     - Positive, non-zero integer that expresses how much backup work
       this :term:`snapshot store` should perform compared to another
       snapshot store. Set this option only if you're using more than
       one snapshot store.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see
          :doc:`Edit an Existing Blockstore </tutorial/manage-blockstore-storage>`

   * - mmapv1CompressionSetting
     - string
     - Optional
     - Compression setting if you use the MMAPv1 storage engine for
       your snaphots.

       |mms| accepts ``NONE`` or ``GZIP``. |mms| sets this value to
       ``NONE`` by default.

       If the MongoDB runs |fcv-link| 4.2 or later, |onprem| ignores
       this setting.

       .. important::

          .. include:: /includes/fact-mmapv1-deprecated.rst

   * - storePath
     - string
     - Required
     - Location where file system-based backups are stored on the
       file system store host.

   * - wtCompressionSetting
     - string
     - Optional
     - Compression setting if you use the WiredTiger storage engine for
       your snaphots.

       |mms| accepts ``NONE`` or ``GZIP``. |mms| sets this value to
       ``GZIP`` by default.

       If the MongoDB runs |fcv-link| 4.2 or later, |onprem| ignores
       this setting.
