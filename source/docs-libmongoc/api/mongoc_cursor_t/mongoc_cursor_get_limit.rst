.. _mongoc_cursor_get_limit

mongoc_cursor_get_limit()
=========================

Synopsis
--------

.. code-block:: c

  int64_t
  mongoc_cursor_get_limit (mongoc_cursor_t *cursor);

Parameters
----------

* ``cursor``: A :ref:`mongoc_cursor_t`.

Description
-----------

Return the value set with :ref:`mongoc_cursor_set_limit` or :ref:`mongoc_collection_find`.

