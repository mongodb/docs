.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Tool
     - Description

   * - |mongosync|

     - The |mongosync| binary is the primary process used in |service| live migration.
       Use ``mongosync`` to migrate data from one {+cluster+} to a 
       {+cluster+} in |service|. |service| syncs data from the source to
       the destination {+cluster+} until you cut your applications over
       to the destination |service| {+cluster+}.

   * - :atlas:`mongomirror </import/mongomirror/>`

     - Migrate from a MongoDB *replica set* into an |service| cluster
       without shutting down your existing replica set or applications.
       :atlas:`mongomirror </import/mongomirror/>` does not import
       user/role data or copy the ``config`` database.

   * - :atlas:`mongorestore </import/mongorestore/>`

     - Seed an |service| cluster with a ``BSON`` data backup dump of an
       existing MongoDB deployment. :atlas:`mongorestore </import/mongorestore/>`
       does not restore ``system.profile`` collection data.

   * - :atlas:`mongoimport </import/mongoimport/>`

     - Load data from a ``JSON`` or a ``CSV`` file into an |service|
       cluster. :binary:`mongoimport` uses
       :manual:`strict mode representation for certain BSON types </reference/mongodb-extended-json>`.

   * - :compass:`MongoDB Compass </import-export/>`

     - Use a :abbr:`GUI (Graphical User Interface)` to load data
       from a ``JSON`` or a ``CSV`` file into an |service| cluster.

You can also restore from an |service| cluster backup data to another
|service| cluster. For information, see :ref:`restore-overview`.