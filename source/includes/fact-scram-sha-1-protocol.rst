Even when using the ``MONGODB-CR`` authentication mechanism, clients and drivers that
support MongoDB 3.0 features (see :ref:`compatibility-driver-versions`) will use the
``SCRAM`` communication protocol. That is, ``MONGODB-CR`` authentication mechanism
also implies :doc:`/core/security-scram-sha-1`.

.. COMMENT from DOCS-6342 (Andrew Ryder)
