After you upgrade a deployment that already has MongoDB Challenge
and Response (``MONGODB-CR``) user credentials, if you have not
upgraded the authentication schema, you can continue to use
``MONGODB-CR``:

- For older versions of drivers that do not support MongoDB 3.0+
  features, you will continue to use ``MONGODB-CR``.

- For drivers that support MongoDB 3.0+ features (see
  :ref:`compatibility-driver-versions`), you can explicitly specify
  ``MONGODB-CR`` as the authentication mechanism to use ``MONGODB-CR``.
  Otherwise, the credentials are temporarily converted to use SCRAM
  during authentication to provide improved protection from passive
  eavesdroppers; this temporary conversion does not affect how the
  credentials are stored.

.. note::

   .. include:: /includes/fact-mongodb-cr-deprecated.rst

