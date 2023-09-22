Index inconsistencies include:

- An index is :ref:`multikey <index-type-multikey>` but there are
  no multikey fields.
- An index has :ref:`multikeyPaths <compound_multikey_indexes>` covering 
  fields that are not multikey.
- An index does not have 
  :ref:`multikeyPaths <compound_multikey_indexes>` but
  there are multikey documents (for indexes built before 3.4).

If any inconsistencies are detected by the 
:method:`db.collection.validate()` command, a warning is returned 
and the repair flag on the index is set to ``true``.

:method:`db.collection.validate()` also validates any documents that
violate the collection's 
:ref:`schema validation rules <schema-validation-document>`.
