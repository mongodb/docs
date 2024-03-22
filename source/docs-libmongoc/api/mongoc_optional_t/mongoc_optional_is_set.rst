.. _mongoc_optional_is_set

mongoc_optional_is_set()
========================

Synopsis
--------

.. code-block:: c

  bool
  mongoc_optional_is_set (const mongoc_optional_t *opt);

Returns whether a value for a :ref:`mongoc_optional_t` was set.

Parameters
----------

* ``opt``: A :ref:`mongoc_optional_t`.

Returns
-------

Returns ``true`` if a value was set, or ``false`` otherwise.
