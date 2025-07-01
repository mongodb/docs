:gold:`IMPORTANT:` |fts| dynamically indexes all fields in a ``document`` using the 
default settings for the detected data type. |fts| also dynamically 
indexes all nested documents under the ``document``, unless you 
explicitly override by setting ``dynamic`` to ``false``.
