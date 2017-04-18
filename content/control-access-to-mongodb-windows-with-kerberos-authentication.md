+++
title = "Configure MongoDB with Kerberos Authentication on Windows"

[tags]
+++
# Configure MongoDB with Kerberos Authentication on Windows


# On this page

* [Overview](#overview) 

* [Prerequisites](#prerequisites) 

* [Procedures](#procedures) 

* [Additional Considerations](#additional-considerations) 

New in version 2.6.


## Overview

MongoDB Enterprise supports authentication using a [Kerberos
service](#). Kerberos is an industry standard
authentication protocol for large client/server system. Kerberos allows
MongoDB and applications to take advantage of existing authentication
infrastructure and processes.


## Prerequisites

Setting up and configuring a Kerberos deployment is beyond the scope of
this document. This tutorial assumes have configured a [Kerberos
service principal](#kerberos-service-principal) for each
[``mongod.exe``](#bin.mongod.exe) and [``mongos.exe``](#bin.mongos.exe) instance.

For replica sets and sharded clusters, ensure that your configuration
uses fully qualified domain names (FQDN) rather than IP addresses or
unqualified hostnames. You must use the FQDN for GSSAPI to correctly
resolve the Kerberos realms and allow you to connect.


## Procedures


### Step 1: Start ``mongod.exe`` without Kerberos.

For the initial addition of Kerberos users, start [``mongod.exe``](#bin.mongod.exe)
without Kerberos support.

If a Kerberos user is already in MongoDB and has the
[privileges required to create a user](#createuser-required-access), you can start
[``mongod.exe``](#bin.mongod.exe) with Kerberos support.


### Step 2: Connect to ``mongod``.

Connect via the ``mongo.exe`` shell to the [``mongod.exe``](#bin.mongod.exe)
instance. If [``mongod.exe``](#bin.mongod.exe) has [``--auth``](#cmdoption-auth) enabled, ensure
you connect with the [privileges required to create a user](#createuser-required-access).


### Step 3: Add Kerberos Principal(s) to MongoDB.

Add a Kerberos principal, ``<username>@<KERBEROS REALM>``, to
MongoDB in the ``$external`` database. Specify the Kerberos realm in
**ALL UPPERCASE**. The ``$external`` database allows
[``mongod.exe``](#bin.mongod.exe) to consult an external source (e.g. Kerberos)
to authenticate. To specify the user's privileges, assign
[roles](#) to the user.

The following example adds the Kerberos principal
``reportingapp@EXAMPLE.NET`` with read-only access to the
``records`` database:

```javascript

use $external
db.createUser(
   {
     user: "reportingapp@EXAMPLE.NET",
     roles: [ { role: "read", db: "records" } ]
   }
)

```

Add additional principals as needed. For every user you want to
authenticate using Kerberos, you must create a corresponding user in
MongoDB.
For more
information about creating and managing users, see
[User Management Commands](#).


### Step 4: Start ``mongod.exe`` with Kerberos support.

You must start [``mongod.exe``](#bin.mongod.exe) as the [service principal
account](#assign-service-principal-name).

To start [``mongod.exe``](#bin.mongod.exe) with Kerberos support, set
the [``mongod.exe``](#bin.mongod.exe) parameter
[``authenticationMechanisms``](#param.authenticationMechanisms) to ``GSSAPI``:

```sh

mongod.exe --setParameter authenticationMechanisms=GSSAPI <additional mongod.exe options>

```

For example, the following starts a standalone [``mongod.exe``](#bin.mongod.exe)
instance with Kerberos support:

```sh

mongod.exe --auth --setParameter authenticationMechanisms=GSSAPI

```

Modify or include additional
[``mongod.exe``](#bin.mongod.exe) options as required for your configuration.


### Step 5: Connect ``mongo.exe`` shell to ``mongod.exe`` and authenticate.

Connect the ``mongo.exe`` shell client as the Kerberos
principal ``application@EXAMPLE.NET``.

You can connect and authenticate from the command line.

```sh

mongo.exe --host hostname.example.net --authenticationMechanism=GSSAPI --authenticationDatabase='$external' --username reportingapp@EXAMPLE.NET

```

If you are connecting to a system whose hostname matches the
Kerberos name, ensure that you specify the fully qualified
domain name (FQDN) for the ``--host``
option, rather than an IP address or unqualified hostname.

If you are connecting to a system whose hostname does not
match the Kerberos name, use ``--gssapiHostName``
to specify the Kerberos FQDN that it responds to.

Alternatively, you can first connect ``mongo.exe`` to the
[``mongod.exe``](#bin.mongod.exe), and then from the ``mongo.exe`` shell, use
the [``db.auth()``](#db.auth) method to authenticate in the
``$external`` database.

```javascript

use $external
db.auth( { mechanism: "GSSAPI", user: "reportingapp@EXAMPLE.NET" } )

```


## Additional Considerations


### Configure ``mongos.exe`` for Kerberos

To start [``mongos.exe``](#bin.mongos.exe) with Kerberos support, set the
[``mongos.exe``](#bin.mongos.exe) parameter [``authenticationMechanisms``](#param.authenticationMechanisms)
to ``GSSAPI``. You must start [``mongos.exe``](#bin.mongos.exe) as the
[service principal account](#assign-service-principal-name).:

```sh

mongos.exe --setParameter authenticationMechanisms=GSSAPI <additional mongos options>

```

For example, the following starts a [``mongos``](#bin.mongos) instance with
Kerberos support:

```sh

mongos.exe --setParameter authenticationMechanisms=GSSAPI --configdb shard0.example.net, shard1.example.net,shard2.example.net --keyFile C:\<path>\mongos.keyfile

```

Modify or include any additional [``mongos.exe``](#bin.mongos.exe) options as required
for your configuration. For example, instead of using
[``--keyFile``](#cmdoption-keyfile) for internal authentication of sharded cluster
members, you can use [x.509 member authentication](#x509-internal-authentication) instead.


### Assign Service Principal Name to MongoDB Windows Service

Use ``setspn.exe`` to assign the service principal name (SPN) to the
account running the ``mongod.exe`` and the ``mongos.exe`` service:

```sh

setspn.exe -A <service>/<fully qualified domain name> <service account name>

```

For example, if [``mongod.exe``](#bin.mongod.exe) runs as a service named
``mongodb`` on ``testserver.mongodb.com`` with the service account name
``mongodtest``, assign the SPN as follows:

```sh

setspn.exe -A mongodb/testserver.mongodb.com mongodtest

```


### Incorporate Additional Authentication Mechanisms

Kerberos authentication ([GSSAPI](#security-auth-kerberos) (Kerberos))
can work alongside MongoDB's challenge/response authentication mechanisms
([SCRAM-SHA-1](#authentication-scram-sha-1) and
[MONGODB-CR](#authentication-mongodb-cr)), MongoDB's
authentication mechanism for LDAP ([PLAIN](#security-auth-ldap)
(LDAP SASL)), and MongoDB's authentication mechanism for x.509 (
[MONGODB-X509](#security-auth-x509)). Specify the
mechanisms as follows:

```sh

--setParameter authenticationMechanisms=GSSAPI,SCRAM-SHA-1

```

Only add the other mechanisms if in use. This parameter setting does
not affect MongoDB's internal authentication of cluster members.
