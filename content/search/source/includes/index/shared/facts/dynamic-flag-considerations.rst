:gold:`IMPORTANT:` |fts| automatically indexes all dynamically indexable
field types in a ``document``. |fts| also recursively indexes all nested
documents under the ``document``, unless you explicitly override by
setting ``dynamic`` to ``false``. You can also configure dynamic
indexing to only index specified field types using ``typeSets``. 