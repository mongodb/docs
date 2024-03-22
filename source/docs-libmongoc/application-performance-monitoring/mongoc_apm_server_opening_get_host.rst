.. _mongoc_apm_server_opening_get_host

mongoc_apm_server_opening_get_host()
====================================

Synopsis
--------

.. code-block:: c

  const mongoc_host_list_t *
  mongoc_apm_server_opening_get_host (const mongoc_apm_server_opening_t *event);

Returns this event's host. This :ref:`mongoc_host_list_t` is *not* part of a linked list, it is solely the server for this event. The data is only valid in the scope of the callback that receives this event; copy it if it will be accessed after the callback returns.

Parameters
----------

* ``event``: A :ref:`mongoc_apm_server_opening_t`.

Returns
-------

A :ref:`mongoc_host_list_t` that should not be modified or freed.

.. seealso::

  | :doc:`Introduction to Application Performance Monitoring <application-performance-monitoring>`

