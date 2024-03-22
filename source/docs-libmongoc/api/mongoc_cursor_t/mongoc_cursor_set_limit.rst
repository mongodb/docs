.. _mongoc_cursor_set_limit

mongoc_cursor_set_limit()
=========================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_cursor_set_limit (mongoc_cursor_t *cursor, int64_t limit);

Parameters
----------

* ``cursor``: A :ref:`mongoc_cursor_t`.
* ``limit``: The maximum number of documents to retrieve for this query.

Description
-----------

Limits the number of documents in the result set.

This function is useful for setting the limit on a cursor after the cursor is created, but before any calls to :ref:`mongoc_cursor_next`. It can also be used to pass a negative limit: The ``limit`` parameter to ``mongoc_cursor_set_limit`` is signed, although for backward-compatibility reasons the ``limit`` parameter to :ref:`mongoc_collection_find` is not.

Calling this function after :ref:`mongoc_cursor_next` has no effect.

This is not applicable to all cursors. Calling :ref:`mongoc_cursor_set_limit` on a cursor returned by :ref:`mongoc_client_find_databases_with_opts`, :ref:`mongoc_database_find_collections_with_opts`, or :ref:`mongoc_collection_find_indexes_with_opts` will not change the results.

Returns
-------

Returns true on success. If any arguments are invalid, returns false and leaves the limit unchanged.
