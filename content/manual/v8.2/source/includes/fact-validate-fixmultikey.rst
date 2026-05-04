*Optional*. If ``true``, MongoDB fixes the following issues:

- If the ``validate`` command finds :ref:`multikey <index-type-multikey>` 
  documents for a non-multikey index, MongoDB changes the index to a 
  multikey index.
         
- If the ``validate`` command finds :ref:`multikey <index-type-multikey>` 
  documents that aren't specified by an index's multikey paths, MongoDB  
  updates index's multikey paths.

The default is ``false``.

.. versionadded:: 8.1
    