After you upgrade a deployment that already has MongoDB Challenge
and Response (``MONGODB-CR``) user credentials, if you have not
upgraded the authentication schema, you can continue to use
``MONGODB-CR``:

- For older versions of drivers that do not support MongoDB 3.0+
  features, you will continue to use ``MONGODB-CR``.

- For drivers that support MongoDB 3.0+ features (see
  :ref:`compatibility-driver-versions`), you must explicitly specify
  ``MONGODB-CR`` as the authentication mechanism. Otherwise, the
  credentials are temporarily converted to use SCRAM during
  authentication; this temporary conversion does not affect how the
  credentials are stored.

To upgrade the authentication schema model to SCRAM, see
:doc:`/release-notes/3.0-scram`.

.. warning::

   .. include:: /includes/fact-upgrade-scram-irreversible.rst
