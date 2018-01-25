.. list-table::
   :widths: 15 15 70
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - *Optional.* Flag indicating whether this file system store can be 
       assigned backup jobs.
 
   * - labels
     - array of strings
     - *Optional.* Array of tags to manage which 
       :term:`backup jobs <backup job>` |onprem| can assign to which 
       :term:`file system stores <file system store>`. 

       Setting these tags limits which backup jobs this file system
       store can process. If omitted, this file system store can only
       process backup jobs for projects that do not use labels to filter
       their jobs.
 
   * - loadFactor
     - number
     - *Optional.* A positive, non-zero integer that expresses how much 
       backup work this :term:`snapshot store` should perform compared 
       to another snapshot store. This option is needed only if more 
       than one snapshot store is in use.

       .. seealso::

          To learn more about :guilabel:`Load Factor`, see 
          :doc:`Edit an Existing Blockstore </tutorial/manage-blockstore-storage>`
 
   * - mmapv1CompressionSetting
     - string
     - The compression setting for the MMAPv1 storage engine 
       snaphots.
 
       The accepted values for this option are:

       - ``NONE``
       - ``GZIP``

   * - storePath
     - string
     - The location where file system-based backups are stored on 
       the file system store host.
 
   * - wtCompressionSetting
     - string
     - The compression setting for the WiredTiger storage engine 
       snaphots.
 
       The accepted values for this option are:

       - ``NONE``
       - ``SNAPPY``
       - ``ZLIB``
