M0 {+Free-clusters+} and {+Flex-clusters+} don't support the following
command line tool options:

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Command Line Tool
     - Unsupported Options

   * - |mongorestore|
     - - :dbtools:`--restoreDbUsersAndRoles 
         </mongorestore/#std-option-mongorestore.--restoreDbUsersAndRoles>`
       - :dbtools:`--oplogReplay
         </mongorestore/#std-option-mongorestore.--oplogReplay>`
       - :dbtools:`--preserveUUID 
         </mongorestore/#std-option-mongorestore.--preserveUUID>`
          
   * - |mongodump|
     - - :dbtools:`--dumpDbUsersAndRoles 
         </mongodump/#std-option-mongodump.--dumpDbUsersAndRoles>`
       - :dbtools:`--oplog </mongodump/#std-option-mongodump.--oplog>`
          