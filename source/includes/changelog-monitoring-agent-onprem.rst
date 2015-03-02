.. REVIEWERS: Is the version number below correct???

Monitoring Agent ``2.9.1.176``
------------------------------

- Adds support for non-default Kerberos service names.

- Added support for authentication using MongoDB 2.4 style client
  certificates.

- The Monitoring Agent now identifies itself to the MMS servers using the
  fully qualified domain name (FQDN) of the server on which it is running.

- |mms| now staggers the timing of DNS look-ups, to avoid triggering a
  rare issue in glibc 2.19 on Ubuntu 14.04.

.. REVIEWERS: The remaining bullets are NOT from Cory's writeup in DOCS-4772
     but from the Cloud releases since the last "Onprem" release. Are the correct
     to include here???

- Adds support for RHEL7.

- The :guilabel:`Deployment` tab now displays all deployment information
  for both servers and processes on one page. Icons provide different view
  options.

- Improved error handling on Windows.

- Improved connection management for monitored MongoDB processes.

- Improve correctness of the database statics collection.

- Now uses the :dbcommand:`listDatabases` command to retrieve a list of
  databases.

- The default value for :msetting:`sslTrustedServerCertificates` is now
  ``true``. Users upgrading from 2.4.0 and using SSL will need to set the
  value of :msetting:`sslTrustedServerCertificates` in their configuration
  file. See :msetting:`sslTrustedServerCertificates` for more information.

Monitoring Agent ``2.4.2.113``
------------------------------

*Released with OnPrem 1.5.0*

- Upgraded agent to use Go 1.3.

- Updated mgo driver, which includes fix for :issue:`MGO-34`. All DNS
  lookups should now timeout appropriately.

- Added support for connecting to hosts using LDAP authentication.

- Added support for ``version`` and ``-version`` command line options.

- Agent now displays git commit hash of Monitoring Agent in the log file.

- Updates to the configuration file format.

Monitoring Agent ``2.3.1.89-1``
-------------------------------

*Released with OnPrem 1.4.3*

- Improved logging for MongoDB 2.6 config servers when connecting with
  a user that has the built-in clusterMonitor role.

- Fixes issues with connecting to replica set members that use auth
  with an updated Go client library.

- Added support for HTTP proxy configuration in the agent
  configuration file.

- Agent includes support for an Offline data collection mode.

Monitoring Agent ``2.1.4.51-1``
-------------------------------

*Released with |mms| OnPrem 1.4.2*

Prevent high CPU use when monitoring unreachable :program:`mongod`.

Monitoring Agent ``2.1.3.48-1``
-------------------------------

*Released with OnPrem 1.4.1*

Reduction in unnecessary log messages for unsupported operations on
monitored MongoDB 2.2 instances.

Monitoring Agent ``2.1.1.41-1``
-------------------------------

*Released with OnPrem 1.4.0*

Ability to monitor hosts using Kerberos authentication.

Monitoring Agent ``1.6.6``
--------------------------

*Released with OnPrem1.3*

- Added kerberos support for agents running on Python 2.4.x.

- Added logging when the ``dbstats`` command fails.
