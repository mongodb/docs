Starting in MongoDB 5.0, document field names can be dollar (``$``)
prefixed and can contain periods (``.``). However,
:binary:`~bin.mongoimport` and :binary:`~bin.mongoexport` may not work
as expected in some situations with field names that make use of these
characters.

:ref:`MongoDB Extended JSON v2 <extended-json-high-level-ref-v2>`
cannot differentiate between type wrappers and fields that happen to
have the same name as type wrappers. Do not use Extended JSON
formats in contexts where the corresponding BSON representations
might include dollar (``$``) prefixed keys. The
:ref:`DBRef <dbref-explanation>` mechanism is an exception to this
general rule. 

There are also restrictions on using :binary:`~bin.mongoimport` and
:binary:`~bin.mongoexport` with periods (``.``) in field names. Since
CSV files use the period (``.``) to represent data hierarchies, a
period (``.``) in a field name will be misinterpreted as a level of
nesting.

