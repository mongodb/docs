.. warning::

   :program:`mongoimport` and :program:`mongoexport` do not reliably
   preserve all rich :term:`BSON` data types because :term:`JSON` can
   only represent a subset of the types supported by BSON. As a result,
   data exported or imported with these tools may lose some measure of
   fidelity. See :doc:`/reference/mongodb-extended-json` for more
   information.
