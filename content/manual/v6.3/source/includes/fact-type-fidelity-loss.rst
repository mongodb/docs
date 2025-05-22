.. Must be updated with DOCS-4837/TOOLS-178

.. warning::
   Avoid using :binary:`~bin.mongoimport` and :binary:`~bin.mongoexport` for
   full instance production backups. They do not reliably preserve all rich
   :term:`BSON` data types, because :term:`JSON` can only represent a subset
   of the types supported by BSON. Use :binary:`~bin.mongodump`
   and :binary:`~bin.mongorestore` as described in :doc:`/core/backups` for this
   kind of functionality.
