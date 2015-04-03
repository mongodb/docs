Overview
--------

|mms| provides configurable encryption, authentication, and authorization
to ensure the security of your |mms| agents and MongoDB deployments. |mms|
supports :ref:`SSL <cloud-ssl>`, :ref:`cloud-mongodb-cr`,
:ref:`cloud-ldap`, and :ref:`cloud-kerberos`.

.. _cloud-ssl:

SSL Encryption
--------------

|mms| can use SSL for encrypting communications for the following
Monitoring Agent and Backup Agent connections:

- Connections to |mms|.

- Connections to MongoDB instances that use SSL. You must set each MongoDB
  host's :guilabel:`Use SSL` setting in |mms| and must configure the
  agents' SSL settings. See
  :doc:`/tutorial/configure-monitoring-agent-for-ssl` and
  :doc:`/tutorial/configure-backup-agent-for-ssl`.

Access Control and Authentication
---------------------------------

MongoDB uses Role-Based Access Control (RBAC) to determine access to a
MongoDB system. When run with access control, MongoDB requires users to
authenticate themselves to determine their access.

If you :ref:`enable authentication <enable-authentication>` for your
deployments, the |mms| agents authenticate to the deployments as MongoDB
users with appropriate privileges.

If a MongoDB deployment runs with access control, the Monitoring and
Backup Agents must authenticate to the deployment as MongoDB users with
appropriate access. See the following:

- :doc:`/reference/required-access-monitoring-agent`
- :doc:`/reference/required-access-backup-agent`

For an overview on authenticating with the supported mechanisms, see
:ref:`cloud-mongodb-cr`, :ref:`cloud-ldap`, and
:ref:`cloud-kerberos`.

.. _cloud-mongodb-cr:

MONGODB-CR
----------

|mms| can use the MongoDB Challenge-Response, i.e. ``MONGODB-CR``,
authentication mechanism to authenticate to a MongoDB deployment. For more
information, see the ``MONGODB-CR`` section on the :manual:`Authentication
page </core/authentication>` in the MongoDB manual.

If your MongoDB deployment uses ``MONGODB-CR`` for authentication, you
must create a MongoDB user for the |mms| agents as well as specify the
host's authentication settings.

To create a MongoDB user, see
:doc:`/tutorial/configure-monitoring-agent-for-cr` and
:doc:`/tutorial/configure-backup-agent-for-cr`.

You can specify the host's authentication settings when :doc:`adding the
host </tutorial/add-hosts-to-monitoring>`, or you can :doc:`edit the
settings </tutorial/edit-host-authentication-credentials>` for an existing
host.

.. _cloud-ldap:

LDAP
----

|mms| agents can use the LDAP authentication mechanism to authenticate to
the MongoDB deployment.

If your MongoDB deployment uses LDAP for authentication, you must create a
MongoDB user for the |mms| agents as well as specify the host's
authentication settings.

To create a MongoDB user for the agents, see
:doc:`/tutorial/configure-monitoring-agent-for-ldap` and
:doc:`/tutorial/configure-backup-agent-for-ldap`.

You can specify the host's authentication settings when :doc:`adding the host
</tutorial/add-hosts-to-monitoring>`, or you can :doc:`edit
the settings </tutorial/edit-host-authentication-credentials>` for an
existing host.

.. _cloud-kerberos:

Kerberos
--------

If your MongoDB deployment uses Kerberos for authentication, you must
create the Kerberos Principal for the |mms| agents, create a MongoDB user
for that Kerberos Principal, edit the agent's configuration file, and
specify the host's authentication settings.

If you are running both the Monitoring Agent and the Backup Agent on the
same server, then both agents must connect as the same Kerberos Principal.

To create a Kerberos Principal and the associated MongoDB user as well
as edit the configuration file, see
:doc:`/tutorial/configure-monitoring-agent-for-kerberos` and
:doc:`/tutorial/configure-backup-agent-for-kerberos`.

You can specify the host's authentication settings when :doc:`adding
the host </tutorial/add-hosts-to-monitoring>`, or you can :doc:`edit
the settings </tutorial/edit-host-authentication-credentials>` for an
existing host.
