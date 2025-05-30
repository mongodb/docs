*Optional*. A flag that determines whether the command performs a
repair.

- If ``true``, a repair is performed.

- If ``false``, no repair is performed.

The default is ``false``.

A repair can only be run on a standalone node.

The repair fixes these issues:

- If missing index entries are found, the missing keys are inserted into
  the index.

- If extra index entries are found, the extra keys are removed from the
  index.

- If :doc:`multikey </core/index-multikey>` documents are found for an
  index that is not a :doc:`multikey </core/index-multikey>` index, the
  index is changed to a :doc:`multikey </core/index-multikey>` index.

- If :doc:`multikey </core/index-multikey>` documents are found that are
  not specified by an index's :doc:`multikey </core/index-multikey>`
  paths, the index's :doc:`multikey </core/index-multikey>` paths are
  updated.

- If corrupt documents with invalid BSON data are found, the documents
  are removed.

For more information, see the :option:`--repair <mongod --repair>` option
for :binary:`~bin.mongod`

.. versionadded:: 5.0
