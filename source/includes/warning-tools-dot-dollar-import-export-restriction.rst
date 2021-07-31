.. warning:: Data Import and Export Conflicts With (``$``) and (``.``)

   Starting in MongoDB 5.0, document field names can be (``$``)
   prefixed and can contain a (``.``). However,
   :binary:`~bin.mongoimport` and :binary:`~bin.mongoexport` should not
   be used with field names that make use of these characters.

   :ref:`MongoDB Extended JSON v2 <extended-json-high-level-ref-v2>`
   cannot differentiate between type wrappers and fields that happen to
   have the same name as type wrappers. Do not use Extended JSON
   formats in contexts where the corresponding BSON representations
   might include (``$``) prefixed keys. The
   :ref:`DBRef <dbref-explanation>` mechanism is an exception to this
   general rule. 

   There are also restrictions on using :binary:`~bin.mongoimport` and
   :binary:`~bin.mongoexport` with (``.``) in field names. Since CSV
   files use the (``.``) to represent data hierarchies, a (``.``) in a
   field name will be misinterpreted as a level of nesting.

