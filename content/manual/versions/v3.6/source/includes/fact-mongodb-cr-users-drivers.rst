For older versions of drivers that do not support MongoDB 3.0+
features, you will continue to use MONGODB-CR.

For drivers that support MongoDB 3.0+ features (see
:ref:`compatibility-driver-versions`), the default behavior is to
temporarily convert the credentials to SCRAM during authentication;
this temporary conversion does not affect how the credentials are
stored. If you choose to use ``MONGODB-CR``, you must explicitly
specify ``MONGODB-CR`` as the authentication mechanism.
