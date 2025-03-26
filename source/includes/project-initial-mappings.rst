- :guilabel:`Start with a MongoDB schema that matches your relational schema`
   Creates your initial project with a new document mapping rule for each table.

- :guilabel:`Start with a recommended MongoDB schema`
   Relational Migrator creates mapping rules for a suggested MongoDB schema. 
   When you choose this option, a table appears showing the imported relational tables. 
   Relational Migrator suggests which tables should be represented as 
   :guilabel:`top-level` or :guilabel:`embedded` collections. 
   You can use the checkboxes to modify which tables are mapped into 
   collections or embedded.

- :guilabel:`Start with an empty MongoDB schema` 
   Creates your initial project with no mapping rules.

.. note::

   Regardless of the option you choose when starting your project, 
   you have the flexibility to manually add, remove, or modify mapping 
   rules at any time. This allows you to customize the MongoDB schema 
   according to the specific requirements of your workload.
