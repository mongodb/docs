+++
title = "Configure MongoDB with Kerberos Authentication on Linux"

tags = [ "mongodb", "administration", "security", "advanced" ]
+++

# Configure MongoDB with Kerberos Authentication on Linux

New in version 2.4.


## Overview

MongoDB Enterprise supports authentication using a [Kerberos
service](https://docs.mongodb.com/manual/core/kerberos). Kerberos is an industry standard
authentication protocol for large client/server system.


## Prerequisites

Setting up and configuring a Kerberos deployment is beyond the scope of
this document. This tutorial assumes you have configured a
[Kerberos service principal](https://docs.mongodb.com/manual/core/kerberos/#kerberos-service-principal) for each
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance in your MongoDB
deployment, and you have a valid [keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files) for
for each [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance.

For replica sets and sharded clusters, ensure that your configuration
uses fully qualified domain names (FQDN) rather than IP addresses or
unqualified hostnames. You must use the FQDN for GSSAPI to correctly
resolve the Kerberos realms and allow you to connect.

To verify MongoDB Enterprise binaries, pass the ``--version`` command line
option to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos):

```sh

mongod --version

```

In the output from this command, look for the string ``modules:
subscription`` or ``modules: enterprise`` to confirm your system has
MongoDB Enterprise.


## Procedure

The following procedure outlines the steps to add a Kerberos user
principal to MongoDB, configure a standalone [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance
for Kerberos support, and connect using the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell and
authenticate the user principal.


### Step 1: Start ``mongod`` without Kerberos.

For the initial addition of Kerberos users, start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
without Kerberos support.

If a Kerberos user is already in MongoDB and has the
[privileges required to create a user](https://docs.mongodb.com/manual/reference/command/createUser/#createuser-required-access), you can start
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with Kerberos support.

Include additional settings as appropriate to your deployment.

Note: Starting in MongoDB 3.6, [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) and [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) bind to localhost by default. If the members of your deployment are run on different hosts or if you wish remote clients to connect to your deployment, you must specify ``--bind_ip`` or [``net.bindIp``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp). For more information, see [Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).


### Step 2: Connect to ``mongod``.

Connect via the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
instance. If [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) has [``--auth``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-auth) enabled, ensure
you connect with the [privileges required to create a user](https://docs.mongodb.com/manual/reference/command/createUser/#createuser-required-access).


### Step 3: Add Kerberos Principal(s) to MongoDB.

Add a Kerberos principal, ``<username>@<KERBEROS REALM>`` or
``<username>/<instance>@<KERBEROS REALM>``, to MongoDB in the
``$external`` database. Specify the Kerberos realm in all uppercase.
The ``$external`` database allows [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) to consult an
external source (e.g. Kerberos) to authenticate. To specify the
user's privileges, assign [roles](https://docs.mongodb.com/manual/core/authorization) to the
user.

The following example adds the Kerberos principal
``application/reporting@EXAMPLE.NET`` with read-only access to the
``records`` database:

```javascript

use $external
db.createUser(
   {
     user: "application/reporting@EXAMPLE.NET",
     roles: [ { role: "read", db: "records" } ]
   }
)

```

Add additional principals as needed. For every user you want to
authenticate using Kerberos, you must create a corresponding user in
MongoDB.
For more
information about creating and managing users, see
[User Management Commands](https://docs.mongodb.com/manual/reference/command/nav-user-management).


### Step 4: Start ``mongod`` with Kerberos support.

To start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with Kerberos support, set the
environmental variable ``KRB5_KTNAME`` to the path of the keytab
file and the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) parameter
[``authenticationMechanisms``](https://docs.mongodb.com/manual/reference/parameters/#param.authenticationMechanisms) to ``GSSAPI`` in the
following form:

```sh

env KRB5_KTNAME=<path to keytab file> \
mongod \
--setParameter authenticationMechanisms=GSSAPI \
<additional mongod options>

```

Include additional options as required for your configuration. For
instance, if you wish remote clients to connect to your deployment
or your deployment members are run on different hosts, specify the
``--bind_ip``. For more information, see
[Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).

For example, the following starts a standalone [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
instance with Kerberos support:

```sh

env KRB5_KTNAME=/opt/mongodb/mongod.keytab \
/opt/mongodb/bin/mongod --auth \
--setParameter authenticationMechanisms=GSSAPI \
--dbpath /opt/mongodb/data --bind_ip localhost,<ip address>

```

The path to your [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) as well as your [keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files) may differ. The [keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files)
must be only accessible to the owner of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod)
process.

With the official ``.deb`` or ``.rpm`` packages, you can set the
``KRB5_KTNAME`` in a environment settings file. See
[KRB5_KTNAME](#setting-krb5-ktname) for details.


### Step 5: Connect ``mongo`` shell to ``mongod`` and authenticate.

Connect the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell client as the Kerberos principal
``application/reporting@EXAMPLE.NET``. Before connecting, you
must have used Kerberos's ``kinit`` program to get credentials for
``application/reporting@EXAMPLE.NET``.

You can connect and authenticate from the command line.

```sh

mongo --host hostname.example.net --authenticationMechanism=GSSAPI --authenticationDatabase='$external' --username application/reporting@EXAMPLE.NET

```

If you are connecting to a system whose hostname matches the
Kerberos name, ensure that you specify the fully qualified
domain name (FQDN) for the ``--host``
option, rather than an IP address or unqualified hostname.

If you are connecting to a system whose hostname does not
match the Kerberos name, use ``--gssapiHostName``
to specify the Kerberos FQDN that it responds to.

Alternatively, you can first connect [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) to the
[``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), and then from the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, use
the [``db.auth()``](https://docs.mongodb.com/manual/reference/method/db.auth/#db.auth) method to authenticate in the
``$external`` database.

```javascript

use $external
db.auth( { mechanism: "GSSAPI", user: "application/reporting@EXAMPLE.NET" } )

```


## Additional Considerations

<span id="setting-krb5-ktname"></span>


### KRB5_KTNAME

If you installed MongoDB Enterprise using one of the official ``.deb``
or ``.rpm`` packages, and you use the included init/upstart scripts to
control the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) instance, you can set the ``KR5_KTNAME``
variable in the default environment settings file instead of setting
the variable each time.

For ``.rpm`` packages, the default environment settings file is
``/etc/sysconfig/mongod``.

For ``.deb`` packages, the file is ``/etc/default/mongodb``.

Set the ``KRB5_KTNAME`` value in a line that resembles the following:

```javascript

export KRB5_KTNAME="<path to keytab>"

```


### Configure ``mongos`` for Kerberos

To start [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with Kerberos support, set the environmental
variable ``KRB5_KTNAME`` to the path of its [keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files) and the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) parameter
[``authenticationMechanisms``](https://docs.mongodb.com/manual/reference/parameters/#param.authenticationMechanisms) to ``GSSAPI`` in the following form:

```sh

env KRB5_KTNAME=<path to keytab file> \
mongos \
--setParameter authenticationMechanisms=GSSAPI \
<additional mongos options>

```

Include additional options as required for your configuration. For
instance, if you wish remote clients to connect to your deployment
or your deployment members are run on different hosts, specify the
``--bind_ip``. For more information, see
[Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).

For example, the following starts a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instance with
Kerberos support:

```sh

env KRB5_KTNAME=/opt/mongodb/mongos.keytab \
mongos \
--setParameter authenticationMechanisms=GSSAPI \
--configdb shard0.example.net, shard1.example.net,shard2.example.net \
--keyFile /opt/mongodb/mongos.keyfile \
--bind_ip localhost,<ip address>

```

The path to your [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) as well as your [keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files) may differ. The [keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files) must
be only accessible to the owner of the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) process.

Modify or include any additional [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) options as required
for your configuration. For example, instead of using
[``--keyFile``](https://docs.mongodb.com/manual/reference/program/mongos/#cmdoption-keyfile) for internal authentication of sharded cluster
members, you can use [x.509 member authentication](https://docs.mongodb.com/manual/tutorial/configure-x509-member-authentication/#x509-internal-authentication) instead.


### Use a Config File

To configure [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) for Kerberos
support using a [configuration file](https://docs.mongodb.com/manual/reference/configuration-options), specify the
[``authenticationMechanisms``](https://docs.mongodb.com/manual/reference/parameters/#param.authenticationMechanisms) setting in the configuration file.

If using the [YAML configuration file format](https://docs.mongodb.com/manual/reference/configuration-options):

```yaml

setParameter:
   authenticationMechanisms: GSSAPI

```

Include additional  options as required
for your configuration. For instance, if you wish remote clients to
connect to your deployment or your deployment members are run on
different hosts, specify the [``net.bindIp``](https://docs.mongodb.com/manual/reference/configuration-options/#net.bindIp) setting. For more
information, see [Localhost Binding Compatibility Changes](https://docs.mongodb.com/manual/release-notes/3.6-compatibility/#bind-ip-compatibility).

For example, if ``/opt/mongodb/mongod.conf`` contains the following
configuration settings for a standalone [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod):

```yaml

security:
   authorization: enabled
setParameter:
   authenticationMechanisms: GSSAPI
storage:
   dbPath: /opt/mongodb/data
net:
   bindIp: localhost,<ip address>

```

To start [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with Kerberos support, use the following
form:

```sh

env KRB5_KTNAME=/opt/mongodb/mongod.keytab \
/opt/mongodb/bin/mongod --config /opt/mongodb/mongod.conf

```

The path to your [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod), [keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files),
and configuration file may differ. The
[keytab file](https://docs.mongodb.com/manual/core/kerberos/#keytab-files) must be only accessible to the owner
of the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) process.


### Troubleshoot Kerberos Setup for MongoDB

If you encounter problems when starting [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) or
[``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) with Kerberos authentication, see
[Troubleshoot Kerberos Authentication](https://docs.mongodb.com/manual/tutorial/troubleshoot-kerberos).

<span id="enable-mixed-kerberos-and-cr"></span>


### Incorporate Additional Authentication Mechanisms

Kerberos authentication ([GSSAPI](https://docs.mongodb.com/manual/core/authentication-mechanisms-enterprise/#security-auth-kerberos) (Kerberos))
can work alongside MongoDB's challenge/response authentication mechanisms
([SCRAM-SHA-1](https://docs.mongodb.com/manual/core/security-scram-sha-1/#authentication-scram-sha-1) and
[MONGODB-CR](https://docs.mongodb.com/manual/core/security-mongodb-cr/#authentication-mongodb-cr)), MongoDB's
authentication mechanism for LDAP ([PLAIN](https://docs.mongodb.com/manual/core/authentication-mechanisms-enterprise/#security-auth-ldap)
(LDAP SASL)), and MongoDB's authentication mechanism for x.509 (
[MONGODB-X509](https://docs.mongodb.com/manual/core/security-x.509/#security-auth-x509)). Specify the
mechanisms as follows:

```sh

--setParameter authenticationMechanisms=GSSAPI,SCRAM-SHA-1

```

Only add the other mechanisms if in use. This parameter setting does
not affect MongoDB's internal authentication of cluster members.


## Additional Resources

* [MongoDB LDAP and Kerberos Authentication with Dell (Quest) Authentication Services](https://www.mongodb.com/blog/post/mongodb-ldap-and-kerberos-authentication-dell-quest-authentication-services?jmp=docs)

* [MongoDB with Red Hat Enterprise Linux Identity Management and Kerberos](https://docs.mongodb.com/ecosystem/tutorial/manage-red-hat-enterprise-linux-identity-management?jmp=docs)
