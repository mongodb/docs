MongoDB Compatibility
~~~~~~~~~~~~~~~~~~~~~

You can use {+csfle+} on a replica set or sharded cluster, but not a
standalone instance. The following table shows which MongoDB Server
products support {+csfle+}:

.. list-table::
   :header-rows: 1
   :widths: 25 15 30 30

   * - Product Name
     - Minimum Version
     - Supports {+csfle-abbrev+} with Automatic Encryption
     - Supports {+csfle-abbrev+} with {+manual-enc-title+}

   * - MongoDB Atlas
     - :atlas:`All supported MongoDB versions
       </reference/faq/database/#which-versions-of-mongodb-do-service-clusters-use->`
     - Yes
     - Yes

   * - MongoDB Enterprise Advanced
     - 4.2
     - Yes
     - Yes

   * - MongoDB Community Edition
     - 4.2
     - No
     - Yes
