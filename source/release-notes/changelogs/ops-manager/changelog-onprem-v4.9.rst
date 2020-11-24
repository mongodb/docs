.. _opsmgr-server-4.9.0:

|onprem| Server 4.9.0
~~~~~~~~~~~~~~~~~~~~~

*Released 2020-11-19*

- Switches to the BCFIPS Java Security Provider library.

- Configures the |onprem| |jvm| to use an unlimited entropy source, ``/dev/urandom``,
  instead of the default, ``/dev/random``.

- Updates the MongoDB Agent to :ref:`10.20.1.6618
  <mongodb-10.20.1.6618>`.
