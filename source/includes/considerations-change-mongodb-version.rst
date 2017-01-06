Before changing a deployment's MongoDB version, consult the following
documents for any special considerations or application compatibility
issues:

- :manual:`The MongoDB Release Notes </release-notes>`

- The documentation for your driver.

- :doc:`/reference/mongodb-compatibility`

Plan the version change during a predefined maintenance window.

Before applying the change to a production environment, change the MongoDB
version on a staging environment that reproduces your production
environment. This can help avoid discovering compatibility issues that may
result in downtime for your production deployment.

If you *downgrade* to an earlier version of MongoDB and your MongoDB
configuration file includes options that are not part of the earlier
MongoDB version, you must perform the downgrade in two phases. First,
remove the configuration settings that are specific to the newer MongoDB
version, and deploy those changes. Then, update the MongoDB version and
deploy that change.

For example, if you are running MongoDB version 3.0 with the
:guilabel:`engine` option set to ``mmapv1``, and you wish to downgrade
to MongoDB 2.6, you must first remove the :guilabel:`engine` option as
MongoDB 2.6 does not include that option.

.. note::

   You may not downgrade a MongoDB deployment from version 3.4 to any
   version before 3.2.8. As such, |mms| will block users from attempting to
   downgrade from ``featureCompatibilityVersion=3.4`` to
   ``featureCompatiblityVersion=3.2``.
