.. _mongoc_find_and_modify_opts_get_fields

mongoc_find_and_modify_opts_get_fields()
========================================

Synopsis
--------

.. code-block:: c

  void
  mongoc_find_and_modify_opts_get_fields (
     const mongoc_find_and_modify_opts_t *opts, bson_t *fields);

Parameters
----------

* ``opts``: A :ref:`mongoc_find_and_modify_opts_t`.
* ``fields``: An uninitialized :ref:`bson_t`.

Description
-----------

Copy to ``fields`` the BSON document that was set with :ref:`mongoc_find_and_modify_opts_set_fields`, or initializes ``fields`` with an empty BSON document.

