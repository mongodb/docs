.. warning:: Data Dump and Restore Conflicts with $ Prefix in Fields

   Starting in MongoDB 5.0, document field names can be prefixed with a
   dollar character (``$``). However, :binary:`~bin.mongodump` and
   :binary:`~bin.mongorestore` won't work with field names that are
   prefixed with a dollar character in a collection's options.

   :manual:`MongoDB Extended JSON
   (v2)</reference/mongodb-extended-json>` cannot differentiate between
   type wrappers and fields that have the same name as type
   wrappers. Don't use extended JSON formats if the
   corresponding BSON representation might include ``$`` prefixed keys.
   The :ref:`DBRefs <dbref-explanation>` mechanism is an exception to
   this general rule.
