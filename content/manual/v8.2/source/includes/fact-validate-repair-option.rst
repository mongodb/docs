*Optional*. A flag that determines whether the command performs a
repair.

- If ``true``, a repair is performed.

- If ``false``, no repair is performed.

The default is ``false``.

A repair can only be run on a standalone node.

The repair fixes the following issues:

- If missing index entries are found, the missing keys are inserted into
  the index.

- If extra index entries are found, the extra keys are removed from the
  index.

- If corrupt documents with invalid BSON data are found, the documents
  are removed.

:gold:`IMPORTANT:` To set ``repair`` to ``true``, you must set the 
``fixMultikey`` option to ``true``.

For more information, see the :option:`--repair <mongod --repair>` option
for :binary:`~bin.mongod`

.. versionadded:: 5.0
