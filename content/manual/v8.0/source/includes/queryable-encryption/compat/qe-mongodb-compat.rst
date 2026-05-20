MongoDB Compatibility
~~~~~~~~~~~~~~~~~~~~~

You can use {+qe+} on a MongoDB Server 7.0 or later replica set or
sharded cluster, but not a standalone instance. The following table
shows which MongoDB Server products support {+qe+}:

.. list-table::
   :header-rows: 1
   :widths: 25 15 30 30

   * - Product Name
     - Minimum Version
     - Supports {+qe+} with Automatic Encryption
     - Supports {+qe+} with {+manual-enc-title+}

   * - MongoDB Atlas
     - 7.0
     - Yes
     - Yes

   * - MongoDB Enterprise Advanced
     - 7.0
     - Yes
     - Yes

   * - MongoDB Community Edition
     - 7.0
     - No
     - Yes

.. note::

   {+qe+} is compatible with MongoDB Atlas but not :atlas:`{+fts+} </atlas-search>`.
