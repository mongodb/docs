.. warning::

   :binary:`~bin.mongoimport` and :binary:`~bin.mongoexport` do not reliably
   preserve all rich :term:`BSON` data types because :term:`JSON` can
   only represent a subset of the types supported by BSON. As a result,
   data exported or imported with these tools may lose some measure of
   fidelity. See the :doc:`Extended JSON </reference/mongodb-extended-json>`
   reference for more information.
