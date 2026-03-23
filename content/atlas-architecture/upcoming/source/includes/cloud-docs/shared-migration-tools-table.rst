.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Tool
     - Description

   * - |mongosync|

     - The |mongosync| binary is the primary process used by |service| live migration.
       You can use standalone ``mongosync`` to migrate data from one {+cluster+} to a 
       {+cluster+} in |service|. |service| syncs data from the source to
       the destination {+cluster+} until you cut your applications over
       to the destination |service| {+cluster+}.

   * - :atlas:`mongomirror </import/mongomirror/>`

     - Migrate from a MongoDB *replica set* into an |service| cluster
       without shutting down your existing replica set or applications.
       :atlas:`mongomirror </import/mongomirror/>` does not import
       user/role data or copy the ``config`` database.

   * - :atlas:`mongorestore </import/mongorestore/>`

     - Seed an |service| cluster with a ``BSON`` data backup dump taken 
       from mongodump, of an existing MongoDB deployment. :atlas:`mongorestore </import/mongorestore/>`
       does not restore ``system.profile`` collection data.

   * - :atlas:`mongoimport </import/mongoimport/>`

     - Load data from a ``JSON`` or a ``CSV`` file into an |service|
       cluster. :binary:`mongoimport` uses
       :manual:`strict mode representation for certain BSON types </reference/mongodb-extended-json>`. 
       Note that using mongoimport should be limited to small datasets for testing and/or development purposes.

   * - :compass:`MongoDB Compass </import-export/>`

     - Use a :abbr:`GUI (Graphical User Interface)` to load data from a ``JSON`` or a ``CSV`` file into an 
       |service| cluster. Note that using MongoDB Compass should be limited to small datasets for testing and/or 
       development purposes.

You can also restore from an |service| cluster backup data to another
|service| cluster. For information, see :ref:`restore-overview`.