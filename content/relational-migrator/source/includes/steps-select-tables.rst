.. _rm-steps-select-tables:

.. tabs::

   .. tab:: Manual Selection
      :tabid: manual-selection

      a. Expand the tree to view databases, schemas, and tables.

      #. Use the check marks to select items:

         - **All tables within a database**: Click the check mark for the database.
         - **All tables within a schema**: Expand the database and click the check mark for the schema.
         - **Specific tables within a schema**: Expand the database and schema, then select tables individually.
         - **Specific table names**: Use the :guilabel:`Filter` bar above the :guilabel:`Relational Schema` list.

   .. tab:: Bulk Selection
      :tabid: bulk-selection

      a. Switch to :guilabel:`Bulk Selection`.

      #. Paste or type a comma-separated list of fully qualified table names (for example, ``database.schema.table``).

         As you type, Relational Migrator filters the list and lets you click matching tables to include or exclude them.
