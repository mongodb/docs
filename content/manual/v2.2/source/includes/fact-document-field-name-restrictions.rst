:doc:`Documents </core/document>` have the following restrictions on field
names:

- The field name ``_id`` is reserved for use as a primary key; its
  value must be unique in the collection, is immutable, and may be of
  any type other than an array.

- The field names **cannot** start with the ``$`` character.

- The field names **cannot** contain the ``.`` character.
