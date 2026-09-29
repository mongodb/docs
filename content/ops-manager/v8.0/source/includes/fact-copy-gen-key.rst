|onprem| uses the ``gen.key`` file to encrypt data at rest in the
:ref:`mms-application-database` and the
:ref:`backup-database`. If you run multiple instances of |onprem| on
different servers, you start |onprem| on one server **only** and then copy the
``gen.key`` from that server to the other servers **before starting** |onprem|
on those other servers.
