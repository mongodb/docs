.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - assignmentEnabled
     - boolean
     - Flag indicating whether this file system store can be 
       assigned backup jobs.
 
   * - id
     - string
     - The Unique Identifier of this file system store.
 
   * - labels
     - array of strings
     - Names that can be used to assign file system stores to 
       specific projects.
 
   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst
 
   * - loadFactor
     - number
     - A positive integer that expresses how much backup work you 
       want this snapshot store to perform compared to another 
       snapshot store.
 
   * - mmapv1CompressionSetting
     - string
     - The compression setting for the MMAPv1 storage engine 
       snaphots.
 
   * - storePath
     - string
     - The location where file system-based backups are stored on 
       the Backup host.
 
   * - wtCompressionSetting
     - string
     - The compression setting for the WiredTiger storage engine 
       snaphots.
 