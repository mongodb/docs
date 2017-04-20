+++
title = "Authenticate and Authorize Users Using Active Directory via Native LDAP"

[tags]
mongodb = "product"
+++
# Authenticate and Authorize Users Using Active Directory via Native LDAP


New in version 3.4: MongoDB EnterpriseMongoDB Enterprise provides support via platform LDAP
libraries for proxying authentication and authorization requests to a
specified Lightweight Directory Access Protocol (LDAP) service such as
Active Directory (AD).

This tutorial describes how to configure MongoDB to perform authentication
and authorization through an Active Directory (AD) server via the platform
libraries.


## Prerequisites

Important: Thoroughly familiarize yourself with the following subjects before proceeding: 

  * [LDAP Authentication](#security-ldap) 

  * [LDAP Authorization](#security-ldap-external) 

  * [Active Directory](https://msdn.microsoft.com/en-us/library/bb742424.aspx) 

A full description of AD (Active Directory) is beyond the scope of
this tutorial. This tutorial assumes prior knowledge of AD (Active
Directory).

MongoDB supports using SASL mechanisms for binding between the MongoDB server
and AD (Active Directory). A full description of SASL, SASL
mechanisms, or the specific AD (Active Directory) configuration
requirements for a given SASL mechanism are beyond the scope of this tutorial.
This tutorial assumes prior knowledge of SASL and its related subject matter.


## Considerations

This tutorial explains configuring MongoDB for AD (Active Directory)
authentication and authorization.

To perform this procedure on your own MongoDB server, you must modify the
given procedures with respect to your own specific infrastructure, especially
Active Directory configurations, constructing AD (Active Directory)
queries, or managing users.


### Transport Layer Security

By default, MongoDB creates a TLS/SSL connection when binding to the AD (Active Directory) server. This requires configuring the host of the MongoDB
server to have access to the AD server's Certificate Authority (CA)
certificates.

This tutorial provides instructions for the required host configurations.

This tutorial assumes you have access to the AD server's CA certificates and
can create a copy of the certificates on the MongoDB server.


### Example Active Directory Schema

This tutorial uses the following example AD (Active Directory) objects
as the basis for the provided queries, configurations, and output. Each object
shows only a subset of the possible attributes.


#### User Objects

```shell

dn:CN=bob,CN=Users,DC=marketing,DC=example,DC=com
userPrincipalName: bob@marketing.example.com
memberOf: CN=marketing,CN=Users,DC=example,DC=com

dn:CN=alice,CN=Users,DC=engineering,DC=example,DC=com
userPrincipalName: alice@engineering.example.com
memberOf: CN=web,CN=Users,DC=example,DC=com
memberOf: CN=PrimaryApplication,CN=Users,DC=example,DC=com

dn:CN=sam,CN=Users,DC=dba,DC=example,DC=com
userPrincipalName: sam@dba.example.com
memberOf: CN=dba,CN=Users,DC=example,DC=com
memberOf: CN=PrimaryApplication,CN=Users,DC=example,DC=com

dn:CN=joe,CN=Users,DC=analytics,DC=example,DC=com
userPrincipalName: joe@analytics.example.com
memberof: CN=marketing,CN=Users,DC=example,DC=com

```


#### Group Objects

```shell

dn:CN=marketing,CN=Users,DC=example,DC=com
member:CN=bob,CN=Users,DC=marketing,DC=example,DC=com
member:CN=joe,CN=Users,DC=analytics,DC=example,DC=com

dn:CN=engineering,CN=Users,DC=example,DC=com
member:CN=web,CN=Users,DC=example,DC=com
member:CN=dba,CN=users,DC=example,DC=com

dn:CN=web,CN=Users,DC=example,DC=com
member:CN=alice,CN=Users,DC=engineering,DC=example,DC=com

dn:CN=dba,CN=Users,DC=example,DC=com
member:CN=sam,CN=Users,DC=dba,DC=example,DC=com

dn:CN=PrimaryApplication,CN=Users,DC=example,DC=com
member:CN=sam,CN=Users,DC=dba,DC=example,DC=com
member:CN=alice,CN=Users,DC=engineering,DC=example,DC=com

```


### Active Directory Credentials

This tutorial uses a username and password for performing queries on the
AD (Active Directory) server. The credentials provided must have
sufficient privileges on the AD server for supporting queries related to
[``security.ldap.userToDNMapping``](#security.ldap.userToDNMapping) or
[``security.ldap.authz.queryTemplate``](#security.ldap.authz.queryTemplate).


### Replica Sets

MongoDB LDAP authorization requires *every* [``mongod``](#bin.mongod) in the replica
set to be on at least MongoDB 3.4.0 or later.


### Sharded Clusters

MongoDB LDAP authorization requires *every* [``mongod``](#bin.mongod) and
[``mongos``](#bin.mongos) in the sharded cluster to be on at least MongoDB 3.4.0 or
later.


## Procedure


### Step 1: Configure TLS/SSL for the server running MongoDB

To connect to the AD (Active Directory) (AD) server via TLS/SSL, the
[``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) require access to the AD (Active Directory) server's Certificate Authority (CA) certificate.

On Linux, specify the AD (Active Directory) server's CA certificates
via the ``TLS_CACERT`` or ``TLS_CACERTDIR`` option in the ``ldap.conf`` file.

Your platform's package manager creates the ``ldap.conf`` file while
installing MongoDB Enterprise's ``libldap`` dependency. For complete
documentation on the configuration file or the referenced options, see
[ldap.conf](http://www.openldap.org/software/man.cgi?query=ldap.conf).

On Microsoft Windows (Microsoft Windows), load the AD (Active
Directory) server's Certificate Authority (CA) certificates with the
platform's credential management tool. The exact credential management tool
is Windows (Microsoft Windows) version dependent. To use the tool,
refer to its documentation for your version of Windows (Microsoft
Windows).

If [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) cannot access to the AD (Active Directory) CA files, they cannot create TLS/SSL connections to the
Active Directory server.

Optionally, set [``security.ldap.transportSecurity``](#security.ldap.transportSecurity) to ``none``
to disable TLS/SSL.

Warning: Setting [``transportSecurity``](#security.ldap.transportSecurity) to ``none`` transmits plaintext information, including user credentials, between MongoDB and the AD (Active Directory) server. 


### Step 2: Connect to the MongoDB server.

Connect to the MongoDB server using the [``mongo``](#bin.mongo) shell using the
[``--host``](#cmdoption-host) and [``--port``](#cmdoption-port) options.

```shell

mongo --host <hostname> --port <port>

```

If your MongoDB server currently enforces authentication, you must
authenticate to the ``admin`` database as a user with role management
privileges, such as those provided by [``userAdmin``](#userAdmin) or
[``userAdminAnyDatabase``](#userAdminAnyDatabase). Include the appropriate
[``--authenticationMechanism``](#cmdoption-authenticationmechanism) for the
MongoDB server's configured authentication mechanism.

```shell

mongo --host <hostname> --port <port> --username <user> --password <pass> --authenticationDatabase="admin" --authenticationMechanism="<mechanism>"

```

Note: For Windows (Microsoft Windows) MongoDB deployments, you should replace [``mongo``](#bin.mongo) with ``mongo.exe`` 


### Step 3: Create user administrative role.

To manage MongoDB users using AD (Active Directory), you need to
create at least one role on the ``admin`` database that can create and
manage roles, such as those provided by [``userAdmin``](#userAdmin) or
[``userAdminAnyDatabase``](#userAdminAnyDatabase).

The role's name must exactly match the Distinguished Name of an AD (Active Directory) group. The group must have at least one AD (Active Directory) user as a member.

Given the available [Active Directory groups](#kerb-auth-ldap-authz-groupobj),the following operation:

* Creates a role named for the AD (Active Directory) group ``CN=dba,CN=Users,DC=example,DC=com``, and 

* Assigns it the [``userAdminAnyDatabase``](#userAdminAnyDatabase) role on the ``admin`` database. 

```javascript

var admin = db.getSiblingDB("admin")
admin.createRole(
   {
     role: "CN=dba,CN=Users,DC=example,DC=com",
     privileges: [],
     roles: [ "userAdminAnyDatabase" ]
   }
)

```

You could alternatively grant the [``userAdmin``](#userAdmin) role for each
database the user should have user administrative privileges on. These roles
provide the necessary privileges for role creation and management.

Important: Consider applying the [principle of least privilege](https://www.us-cert.gov/bsi/articles/knowledge/principles/least-privilege) when configuring MongoDB roles, AD (Active Directory) groups, or group membership. 


### Step 4: Create a MongoDB configuration file.

A MongoDB [configuration file](#) is a
plain-text YAML file with the ``.conf`` file extension.

* If you are upgrading an existing MongoDB deployment, copy the current configuration file and work from that copy. 

* (Linux Only) If this is a new deployment *and* you used your platform's package manager to install MongoDB Enterprise, the installation includes the ``/etc/mongod.conf`` default configuration file. Use that default configuration file, or make a copy of that file to work from. 

* If no such file exists, create an empty file with the ``.conf`` extension and work from that new configuration file. 


### Step 5: Configure MongoDB to connect to Active Directory.

In the MongoDB configuration file, set [``security.ldap.servers``](#security.ldap.servers) to
the host and port of the AD (Active Directory) server. If your
AD (Active Directory) infrastructure includes multiple AD (Active Directory) servers for the purpose of replication, specify the host
and port of the servers as a comma-delimited list to
[``security.ldap.servers``](#security.ldap.servers).

You must also enable LDAP authentication by setting
[``security.authorization``](#security.authorization) to *enabled* and [``setParameter``](#setParameter)
[``authenticationMechanisms``](#param.authenticationMechanisms) to ``PLAIN``

Example: To connect to an AD (Active Directory) server located at
``activedirectory.example.net``, include the following in the
configuration file:```yaml

security:
  authorization: "enabled"
  ldap:
    servers: "activedirectory.example.net"
setParameter:
  authenticationMechanisms: 'PLAIN'

```

MongoDB must bind to the AD (Active Directory) server to perform
queries. By default, MongoDB uses the simple authentication mechanism to
bind itself to the AD (Active Directory) server.

Alternatively, you can configure the following settings in the configuration
file to bind to the AD (Active Directory) server using ``SASL``:

* Set [``security.ldap.bind.method``](#security.ldap.bind.method) to ``sasl`` 

* [``security.ldap.bind.saslMechanisms``](#security.ldap.bind.saslMechanisms), specifying a string of comma-separated SASL mechanisms the AD (Active Directory) server supports. 

This tutorial uses the default ``simple`` LDAP authentication mechanism.


### Step 6: Configure LDAP Query Template for authorization.

In the MongoDB configuration file, set
[``security.ldap.authz.queryTemplate``](#security.ldap.authz.queryTemplate) to an [RFC4516](https://tools.ietf.org/html/rfc4516) formatted LDAP query URL template.
In the template, use the ``{USER}`` placeholder to substitute the
authenticated username into the LDAP query URL. Design the query template to
retrieve the authenticated user's groups.

Note: A full description of [RFC4515](https://tools.ietf.org/html/rfc4515), RFC4516, or AD (Active Directory) queries is out of scope for this tutorial. The [``queryTemplate``](#security.ldap.authz.queryTemplate) provided in this tutorial is an example only, and may not be applicable for your specific AD (Active Directory) deployment. 

Example: The following query template returns any groups that list ``{USER}`` as a
member, following recursive group memberships. This LDAP query assumes
that group objects track user membership by storing full user
Distinguished Name (DN) using the ``member`` attribute. The query
includes the AD (Active Directory) specific matching rule OID
``1.2.840.113556.1.4.1941`` for [LDAP_MATCHING_RULE_IN_CHAIN](https://msdn.microsoft.com/en-us/library/aa746475(v=vs.85).aspx). This
matching rule is an AD (Active Directory) specific extension to
LDAP search filters.```yaml

security:
  ldap:
    authz:
      queryTemplate:
        "DC=example,DC=com??sub?(&(objectClass=group)(member:1.2.840.113556.1.4.1941:={USER}))"

```Using the query template, MongoDB substitutes ``{USER}`` with the
authenticated username to query the LDAP server.For example, a user authenticates as
``CN=sam,CN=Users,DC=dba,DC=example,DC=com``. MongoDB creates an LDAP
query based on the [``queryTemplate``](#security.ldap.authz.queryTemplate),
substituting the ``{USER}`` token with the provided username. The Active
Directory server performs a recursive group lookup for any group that
either directly or transitively lists the user as a member. Based on the
[Active Directory groups](#activedirectory-authauthz-groupobj), the
AD (Active Directory) server returns
``CN=dba,CN=Users,DC=example,DC=com`` and
``CN=engineering,CN=Users,DC=example,DC=com``.

MongoDB maps each returned group DN (Distinguished Name) to a role
on the ``admin`` database. For each mapped group DN (Distinguished
Name), if there is an existing role on the ``admin`` database whose name
exactly matches the DN (Distinguished Name), MongoDB grants the user
the roles and privileges assigned to that role.

The matching rule ``LDAP_MATCHING_RULE_IN_CHAIN`` requires providing the
full DN (Distinguished Name) of the authenticating user. If users
authenticate using a different username format, such as their ``user
principal name``, you must transform the incoming usernames into DNs (Distinguished Name) using [``security.ldap.userToDNMapping``](#security.ldap.userToDNMapping).


### Step 7: Optional: Transform incoming usernames for authentication via Active Directory,

If your users authenticate with a username that is not a full LDAP DN,
you may need to transform the username to support LDAP authentication
or authorization. MongoDB uses the transformed username for both
authentication and authorization.

In the MongoDB configuration file, set
[``userToDNMapping``](#security.ldap.userToDNMapping) to transform the authenticating
user's provided username into an AD (Active Directory) DN to support
the [``queryTemplate``](#security.ldap.authz.queryTemplate).

Example: Given the configured [``queryTemplate``](#security.ldap.authz.queryTemplate),
users must authenticate with their full LDAP DN. If users instead
authenticate using their ``userPrincipalName``, then a transformation
must be applied to convert the provided username to a full LDAP DN.The following [``userToDNMapping``](#security.ldap.userToDNMapping) configuration
uses the ``match`` regular expression filter to capture the provided
username. MongoDB inserts the captured username into the ``ldapQuery``
query template before executing the query.```yaml

security:
  ldap:
    userToDNMapping:
      '[
         {
            match : "(.+)",
            ldapQuery: "DC=example,DC=com??sub?(userPrincipalName={0})"
         }
    ]'

```The Active Directory server returns the full LDAP DN associated to the
user object with a matching ``userPrincipalName``. MongoDB can then use
this transformed username for authentication *and* authorization.

You must modify the given sample configuration to match your deployment. For
example, the ``ldapQuery`` base DN (Distinguished Name) must match
the base DN (Distinguished Name) which contains your user entities.
Other modifications may be necessary to support your AD (Active
Directory) deployment.

Example: A user authenticates as ``alice@ENGINEERING.EXAMPLE.COM``. MongoDB first
applies any transformations specified in
[``userToDNMapping``](#security.ldap.userToDNMapping). Based on the provided
configuration, MongoDB captures the username in the ``match`` stage and
executes an LDAP query:```yaml

DC=example,DC=com??sub?(userPrincipalName=alice@ENGINEERING.EXAMPLE.COM)

```Based on the configured [Active Directory
users](#activedirectory-authauthz-userobj), the AD (Active
Directory) server should return
``CN=alice,CN=Users,DC=engineering,DC=example,DC=com``.MongoDB then executes the LDAP query configured in
[``queryTemplate``](#security.ldap.authz.queryTemplate), replacing the ``{USER}``
token with the *transformed* username
``CN=alice,CN=Users,DC=engineering,DC=example,DC=com``.


### Step 8: Configure query credentials.

MongoDB requires credentials for performing queries on the AD (Active
Directory) server.

Configure the following settings in the configuration file:

* [``security.ldap.bind.queryUser``](#security.ldap.bind.queryUser), specifying the Active Directory user the [``mongod``](#bin.mongod) or [``mongos``](#bin.mongos) binds as for performing queries on the AD (Active Directory) server. 

* [``security.ldap.bind.queryPassword``](#security.ldap.bind.queryPassword), specifying the password for the specified [``queryUser``](#security.ldap.bind.queryUser). 

```yaml

security:
  ldap:
    bind:
      queryUser: "mongodbadmin@dba.example.com"
      queryPassword: "secret123"

```

On Windows (Microsoft Windows) MongoDB servers, you can set
[``security.ldap.bind.useOSDefaults``](#security.ldap.bind.useOSDefaults) to ``true`` to use the
credentials of the OS user instead of ``queryUser`` and ``queryPassword``.

The [``queryUser``](#security.ldap.bind.queryUser) must
have permission to perform all LDAP queries on behalf of MongoDB.


### Step 9: Optional: Add additional configuration settings.

Add any additional configuration options required for your deployment.
For example, you can specify your desired [``storage.dbPath``](#storage.dbPath) or
change the default [``net.port``](#net.port) number.


### Step 10: Start the MongoDB server with Active Directory authentication and authorization.

Start the MongoDB server with the [``--config``](#cmdoption-config) option, specifying the
path to the configuration file created during this procedure. If the
MongoDB server is currently running, make the appropriate preparations to
stop the server.

```shell

mongod --config <path-to-config-file>

```

Windows (Microsoft Windows) MongoDB deployments must use
[``mongod.exe``](#bin.mongod.exe) instead of [``mongod``](#bin.mongod).


### Step 11: Connect to the MongoDB server.

Connect to the MongoDB server, authenticating as a user whose direct or
transitive group membership corresponds to a MongoDB role on the ``admin``
database with [``userAdmin``](#userAdmin), [``userAdminAnyDatabase``](#userAdminAnyDatabase),
or a custom role with equivalent privileges.

Use the [``mongo``](#bin.mongo) shell to authenticate to the MongoDB
server, set the following options:

* [``--host``](#cmdoption-host) with the hostname of the MongoDB server 

* [``--port``](#cmdoption-port) with the port of the MongoDB server 

* [``--username``](#cmdoption-username) to the user's username 

* [``--password``](#cmdoption-password) to the user's password 

* [``--authenticationMechanism``](#cmdoption-authenticationmechanism) to ``'PLAIN'`` 

* [``--authenticationDatabase``](#cmdoption-authenticationdatabase) to ``'$external'`` 

Example: Previously in this procedure, you configured the
``dn:CN=dba,CN=Users,DC=example,DC=com`` role on the ``admin`` database
with the required permissions. This role corresponds to an AD (Active Directory) group. Based on the configured [AD users](#activedirectory-authauthz-userobj), you can authenticate as the user
``sam@dba.example.com`` and receive the required permissions.```shell

mongo --username sam@DBA.EXAMPLE.COM --password secret123 --authenticationMechanism PLAIN --authenticationDatabase $external --host <hostname> --port <port>

```

Windows (Microsoft Windows) MongoDB deployments must use
``mongo.exe`` instead of [``mongo``](#bin.mongo).

Given the configured [Active Directory users](#activedirectory-authauthz-userobj), the user authenticates successfully and
receives the appropriate permissions.

Note: If you want to authenticate as an existing non-``$external`` user, set [``--authenticationMechanism``](#cmdoption-authenticationmechanism) to ``SCRAM-SHA-1``. This requires that the MongoDB server's [``setParameter``](#setParameter) [``authenticationMechanisms``](#param.authenticationMechanisms) includes ``SCRAM-SHA-1``. 


### Step 11: Create roles for mapping returned AD (Active Directory) groups.

For each group on the AD (Active Directory) server you wish to use
for MongoDB authorization, you must create a matching role on the MongoDB
server's ``admin`` database.

Example: The following operation creates a role named after the AD (Active
Directory) group DN ``CN=PrimaryApplication,CN=Users,DC=example,DC=com``,
assigning roles and privileges appropriate to that group:```javascript

db.getSiblingDB("admin").createRole(
   {
     role: "CN=PrimaryApplication,CN=Users,DC=example,DC=com",
     privileges: [],
     roles: [
       { role: "readWrite", db: "PrimaryApplication" }
     ]
   }
)

```Given the configured [Active Directory groups](#activedirectory-authauthz-groupobj), MongoDB grants a user authenticating
as either ``sam@DBA.EXAMPLE.COM`` or ``alice@ENGINEERING.EXAMPLE.COM`` the
[``readWrite``](#readWrite) role on the ``PrimaryApplication`` database.

Note: To manage roles on the ``admin`` database, you must be authenticated as a user with [``userAdmin``](#userAdmin) on ``admin``, [``userAdminAnyDatabase``](#userAdminAnyDatabase), or a custom role on with equivalent privileges. 


### Step 12: Transition existing users from ``$external`` to the ActiveDirectory server

If upgrading an existing installation with [users](#users) configured
on the ``$external`` database, you must meet the following requirements for
each user to ensure access after configuring MongoDB for AD (Active
Directory) authentication and authorization:

* User has a corresponding user object on the AD (Active Directory) server. 

* User has membership in the appropriate groups on the AD (Active Directory) server. 

* MongoDB contains the roles on the ``admin`` database named for the user's AD (Active Directory) groups, such that the authorized user retains its privileges. 

Example: The following user exists on the ``$external`` database:```javascript

{
  user : "joe@ANALYTICS.EXAMPLE.COM",
  roles: [
    { role : "read", db : "web_analytics" },
    { role : "read", db : "PrimaryApplication" }
  ]
}

```Assuming the user belongs to the AD (Active Directory) group
``CN=marketing,CN=Users,DC=example,DC=com``, the following operation
creates a matching role with the appropriate privileges:```javascript

db.getSiblingDB("admin").createRole(
   {
     role: "CN=marketing,CN=Users,DC=example,DC=com",
     privileges: [],
     roles: [
       { role: "read", db: "web_analytics" }
       { role: "read", db: "PrimaryApplication" }
     ]
   }
)

```Based on the configured [``queryTemplate``](#security.ldap.authz.queryTemplate),
MongoDB authorizes any user who has direct or transitive membership in the
``CN=marketing,CN=Users,DC=example,DC=com`` group to perform
[``read``](#read) operations on the ``web_analytics`` and
``PrimaryApplication`` databases.

Important: When configuring a role for a corresponding AD (Active Directory) group, remember that *all* users with membership in that group can receive the assigned roles and privileges. Consider applying the [principle of least privilege](https://www.us-cert.gov/bsi/articles/knowledge/principles/least-privilege) when configuring MongoDB roles, AD (Active Directory) groups, or group membership. 

If you want to continue allowing users on non-``$external`` databases to
access MongoDB, you must include ``SCRAM-SHA-1`` in the
[``setParameter``](#setParameter) [``authenticationMechanisms``](#param.authenticationMechanisms) configuration
option.

```yaml

setParameter:
  authenticationMechanisms: "PLAIN,SCRAM-SHA-1"

```

Alternatively, transition non-``$external`` users to AD (Active
Directory) by following the above procedure.

This procedure produces the following configuration file:

```yaml

security:
   authorization: "enabled"
   ldap:
      servers: "activedirectory.example.net"
      bind:
         queryUser: "mongodbadmin@dba.example.com"
         queryPassword: "secret123"
      userToDNMapping:
         '[
            {
               match: "(.+)",
               ldapQuery: "DC=example,DC=com??sub?(userPrincipalName={0})"
            }
         ]'
      authz:
         queryTemplate: "DC=example,DC=com??sub?(&(objectClass=group)(member:1.2.840.113556.1.4.1941:={USER}))"
setParameter:
   authenticationMechanisms: "PLAIN"

```

The given sample configuration requires modification to match your Active
Directory schema, directory structure, and configuration. You may also require
additional [configuration file options](#) for your deployment.

For more information on configuring roles and privileges, see:

* [role-based access control](#authorization) 

* [privilege actions](#security-user-actions) 

* [collection level access control](#) 
