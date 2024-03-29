.. _mongoc_write_concern_is_default:

mongoc_write_concern_is_default()
=================================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_write_concern_is_default (mongoc_write_concern_t *write_concern);

Parameters
----------

- ``write_concern``: A pointer to a :ref:`mongoc_write_concern_t`.

Description
-----------

Returns true if ``write_concern`` has not been modified from the default. For example, if no "w" option is set in the MongoDB URI and you have not called :ref:`mongoc_client_set_write_concern()`, then
:ref:`mongoc_write_concern_is_default()` is true for the write concern returned by :ref:`mongoc_client_get_write_concern()`.
