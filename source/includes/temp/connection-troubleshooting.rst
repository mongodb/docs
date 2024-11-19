This page offers potential solutions to issues that you might encounter
when using the {+driver-long+} to connect to a MongoDB deployment.

|non-connection-issue-callout|

Server Connection Errors
------------------------

When an issue occurs when you attempt to connect to a server, the {+driver-short+}
returns an error message. If this error resembles the following message, it
indicates that the driver cannot connect to a MongoDB deployment:

|server-selection-timeout-error|

The following sections describe methods that might help resolve the issue.

|check-connection-string-anchor|

Check the Connection String
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Verify that the hostname and port number in the connection string are both
accurate. In the sample error message, the hostname is ``127.0.0.1`` and the
port is ``27017``. The default port value for an instance of MongoDB Server is
``27017``, but you can configure MongoDB to listen on another port.

When connecting to a replica set, include all the replica set hosts in
your connection string. Separate each of the hosts in the connection
string with a comma. This enables the driver to establish a connection if
one of the hosts is unreachable.

|multiple-hosts-connection-guide-link|

|configure-firewall-anchor|

Configure the Firewall
~~~~~~~~~~~~~~~~~~~~~~

If your MongoDB deployment is hosted behind a firewall, ensure the port
on which MongoDB listens is open in the firewall. If your deployment
listens on the default network port, ensure that port ``27017`` is
open in the firewall. If your deployment listens on a different port,
ensure that port is open on the firewall.

.. warning::

   Do not open a firewall port unless you are sure that it is the one
   that your MongoDB deployment listens on.

|check-the-number-of-connections-anchor|

Check the Number of Connections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Each |mongo-client-class| instance supports a maximum number of concurrent open
connections in its connection pool. The configuration parameter |max-pool-size-param|
defines this value and is set to |max-pool-size-default| by default. If the
number of open connections is equal to |max-pool-size-param|, the server waits until
a connection becomes available. If this wait time exceeds the |max-idle-time-param|
value, the driver responds with an error.

|connection-pools-learn-more|

|authentication-error-anchor|

Authentication Errors
---------------------

The {+driver-short+} may be unable connect to a MongoDB deployment if
the authorization is not configured correctly. In these cases, the driver
raises an error message similar to the following message:

|scram-failure-error|

The following sections describe methods that may help resolve the issue.

|check-credentials-formatting-anchor|

Check the Credentials Formatting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the most common causes of authentication issues is invalid
credentials formatting in the MongoDB connection string.

|learn-more-connection-string-admonition|

If your connection string contains a username and password, ensure that
they are correctly formatted.

.. note::

   If your username or password includes any of the following characters, you
   must `percent-encode <https://tools.ietf.org/html/rfc3986#section-2.1>`__ it:

   .. code-block:: none
      :copyable: false

      : / ? # [ ] @

   Use your percent-encoded username and password in your connection string.

|percent-encode-example|

|verify-authentication-mechanism-anchor|

Verify the Authentication Mechanism
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ensure that your credentials and authentication mechanism are correct. You can
specify your authentication credentials in the options of your connection string.

|credentials-provider-alternative-method-description|

|authentication-guide-reference|

|verify-authentication-database-anchor|

Verify User Is in Authentication Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When using a username and password-based authentication method,
the username must be defined in the authentication database.

The default authentication database is the ``admin`` database.
To use a different database for authentication, specify the
``authSource`` option in the connection string.

The following example instructs MongoDB to use the ``users`` database
as the authentication database:

|authsource-param-code-block|

|dns-resolution-anchor|

DNS Resolution Errors
---------------------

The {+driver-short+} may be unable to resolve your DNS connection. When this
happens, you might receive an error message similar to the following message:

|dns-error-message|

If the driver reports this error, try the methods in the following sections
to resolve the issue.

Check Database Deployment Availability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are connecting to MongoDB Atlas and your driver cannot find the DNS
host of the Atlas database deployment, the database deployment might be paused
or deleted.

Ensure that the database deployment exists in Atlas. If the cluster is paused,
you can resume the cluster in the Atlas UI or the
:atlas:`Atlas command line interface </cli/stable/>`.

To learn how to resume a cluster, see
:atlas:`Resume One Cluster </pause-terminate-cluster/#resume-one-cluster/>`
in the Atlas documentation.

Check the Network Addresses
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Verify that the network addresses or hostnames in your connection string
are accurate.

If your deployment is hosted on MongoDB Atlas, you can follow the
:atlas:`Connect to Your Cluster </tutorial/connect-to-your-cluster/>`
tutorial to find your Atlas connection string.