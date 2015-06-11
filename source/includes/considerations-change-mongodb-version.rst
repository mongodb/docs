Before changing a deployment's MongoDB version, consult the following
documents for any special considerations or application compatibility
issues:

- :manual:`The MongoDB Release Notes </release-notes>`

- The documentation for your driver.

Plan the version change during a predefined maintenance window.

Before applying the change to a production environment, change the MongoDB
version on a staging environment that reproduces your production
environment. This can help avoid discovering compatibility issues that may
result in downtime for your production deployment.

Before changing version on a production environment, change versions on a
*staging* environment that reproduces your production environment to
ensure your configuration is compatible with all changes.

If you downgrade to an earlier version of MongoDB, and if you have set
configuration options that are not part of the earlier version, you must
make the changes in two steps. You must first remove the configuration
options that are specific to the higher version and deploy those changes,
then change the MongoDB version and deploy that change. For example, if
run MongoDB 3.0 with the :guilabel:`engine` option set to ``mmapv1`` and
want to downgrade to MongoDB 2.6, you must first remove the
:guilabel:`engine` option. Though MongoDB 2.6 uses ``mmapv1``, it does not
have the :guilabel:`engine` option.
