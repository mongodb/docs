+++
title = "Authenticate Using SASL and LDAP with OpenLDAP"

tags = [ "mongodb-enterprise", "administration", "security", "advanced" ]
+++

# Authenticate Using SASL and LDAP with OpenLDAP

MongoDB Enterprise provides support for proxy authentication of users.
This allows administrators to configure a MongoDB cluster to
authenticate users by proxying authentication requests to a specified
Lightweight Directory Access Protocol (LDAP) service.


## Considerations

Warning: MongoDB Enterprise for Windows does not support binding via ``saslauthd``.

* Linux MongoDB servers support binding to an LDAP server via the ``saslauthd`` daemon.

* Use secure encrypted or trusted connections between clients and the server, as well as between ``saslauthd`` and the LDAP server. The LDAP server uses the ``SASL PLAIN`` mechanism, sending and receiving data in **plain text**. You should use only a trusted channel such as a VPN, a connection encrypted with TLS/SSL, or a trusted wired network.


## Configure ``saslauthd``

LDAP support for user authentication requires proper configuration of
the ``saslauthd`` daemon process as well as the MongoDB server.


### Step 1: Specify the mechanism.

On systems that configure ``saslauthd`` with the
``/etc/sysconfig/saslauthd`` file, such as Red Hat Enterprise Linux,
Fedora, CentOS, and Amazon Linux AMI, set the mechanism ``MECH`` to
``ldap``:

```javascript

MECH=ldap

```

On systems that configure ``saslauthd`` with the
``/etc/default/saslauthd`` file, such as Ubuntu, set the ``MECHANISMS``
option to ``ldap``:

```javascript

MECHANISMS="ldap"

```


### Step 2: Adjust caching behavior.

On certain Linux distributions, ``saslauthd`` starts with the caching
of authentication credentials *enabled*. Until restarted or until the
cache expires, ``saslauthd`` will not contact the LDAP server to
re-authenticate users in its authentication cache. This allows
``saslauthd`` to successfully authenticate users in its cache, even in
the LDAP server is down or if the cached users' credentials are revoked.

To set the expiration time (in seconds) for the authentication cache, see
the [-t option](http://www.linuxcommand.org/man_pages/saslauthd8.html) of
``saslauthd``.


### Step 3: Configure LDAP Options with OpenLDAP.

If the ``saslauthd.conf`` file does not exist, create it.
The ``saslauthd.conf`` file usually resides in the ``/etc``
folder. If specifying a different file path, see the
[-O option](http://www.linuxcommand.org/man_pages/saslauthd8.html) of
``saslauthd``.

To connect to an OpenLDAP server, update the ``saslauthd.conf``
file with the following configuration options:

```

ldap_servers: <ldap uri>
ldap_search_base: <search base>
ldap_filter: <filter>

```

The ``ldap_servers`` specifies the uri of the LDAP server used
for authentication. In general, for OpenLDAP installed on the
local machine, you can specify the value ``ldap://localhost:389``
or if using LDAP over TLS/SSL, you can specify the value
``ldaps://localhost:636``.

The ``ldap_search_base`` specifies distinguished name to which
the search is relative. The search includes the base or objects
below.

The ``ldap_filter`` specifies the search filter.

The values for these configuration options should correspond to the
values specific for your test. For example, to filter on email, specify
``ldap_filter: (mail=%n)`` instead.


#### OpenLDAP Example

A sample ``saslauthd.conf`` file for OpenLDAP includes the following content:

```

ldap_servers: ldaps://ad.example.net
ldap_search_base: ou=Users,dc=example,dc=com
ldap_filter: (uid=%u)

```

To use this sample OpenLDAP configuration, create users with a ``uid``
attribute (login name) and place under the ``Users`` organizational
unit (``ou``) under the domain components (``dc``) ``example`` and
``com``.

For more information on ``saslauthd`` configuration, see
[http://www.openldap.org/doc/admin24/guide.html#Configuringsaslauthd](http://www.openldap.org/doc/admin24/guide.html#Configuringsaslauthd).


### Step 4: Test the ``saslauthd`` configuration.

Use ``testsaslauthd`` utility to test the ``saslauthd``
configuration. For example:

```sh

testsaslauthd -u testuser -p testpassword -f /var/run/saslauthd/mux

```

Note: ``/var/run/saslauthd`` directory must have permissions set to ``755`` for MongoDB to successfully authenticate.

<span id="configure-mongodb-auth-users-openldap"></span>


## Configure MongoDB


### Step 1: Add user to MongoDB for authentication.

Add the user to the ``$external`` database in MongoDB. To specify the
user's privileges, assign [roles](https://docs.mongodb.com/manual/core/authorization) to the
user.

For example, the following adds a user with read-only access to
the ``records`` database.

```sh

db.getSiblingDB("$external").createUser(
    {
      user : <username>,
      roles: [ { role: "read", db: "records" } ]
    }
)

```

Add additional principals as needed. For more
information about creating and managing users, see
[User Management Commands](https://docs.mongodb.com/manual/reference/command/nav-user-management).


### Step 2: Configure MongoDB server.

To configure the MongoDB server to use the ``saslauthd`` instance for
proxy authentication, start the [``mongod``](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) with the following
options:

* [``--auth``](https://docs.mongodb.com/manual/reference/program/mongod/#cmdoption-auth),

* [``authenticationMechanisms``](https://docs.mongodb.com/manual/reference/parameters/#param.authenticationMechanisms) parameter set to ``PLAIN``, and

* [``saslauthdPath``](https://docs.mongodb.com/manual/reference/parameters/#param.saslauthdPath) parameter set to the path to the Unix-domain Socket of the ``saslauthd`` instance.

Configure the MongoDB server using either the command line option
[--setParameter](https://docs.mongodb.com/manual/reference/parameters) or the
[configuration file](https://docs.mongodb.com/manual/reference/configuration-options). Specify
additional configurations as appropriate for your configuration.

If you use the [``authorization``](https://docs.mongodb.com/manual/reference/configuration-options/#security.authorization) option to enforce
authentication, you will need privileges to create a user.


#### Use specific ``saslauthd`` socket path.

For socket path of ``/<some>/<path>/saslauthd``, set the
[``saslauthdPath``](https://docs.mongodb.com/manual/reference/parameters/#param.saslauthdPath) to ``/<some>/<path>/saslauthd/mux``,
as in the following command line example:

```

mongod --auth --setParameter saslauthdPath=/<some>/<path>/saslauthd/mux --setParameter authenticationMechanisms=PLAIN

```

Or if using a [YAML format configuration file](https://docs.mongodb.com/manual/reference/configuration-options), specify the following settings in
the file:

```yaml

security:
   authorization: enabled

setParameter:
   saslauthdPath: /<some>/<path>/saslauthd/mux
   authenticationMechanisms: PLAIN

```

Or, if using the [older configuration file format](https://docs.mongodb.com/v2.4/reference/configuration-options):

```ini

auth=true
setParameter=saslauthdPath=/<some>/<path>/saslauthd/mux
setParameter=authenticationMechanisms=PLAIN

```


#### Use default Unix-domain socket path.

To use the default Unix-domain socket path, set the
[``saslauthdPath``](https://docs.mongodb.com/manual/reference/parameters/#param.saslauthdPath) to the empty string ``""``, as in the
following command line example:

```

mongod --auth --setParameter saslauthdPath="" --setParameter authenticationMechanisms=PLAIN

```

Or if using a [YAML format configuration file](https://docs.mongodb.com/manual/reference/configuration-options), specify the following settings in
the file:

```yaml

security:
   authorization: enabled

setParameter:
   saslauthdPath: ""
   authenticationMechanisms: PLAIN

```

Or, if using the [older configuration file format](https://docs.mongodb.com/v2.4/reference/configuration-options):

```ini

auth=true
setParameter=saslauthdPath=""
setParameter=authenticationMechanisms=PLAIN

```


### Step 3: Authenticate the user in the ``mongo`` shell.

To perform the authentication in the [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell, use the
[``db.auth()``](https://docs.mongodb.com/manual/reference/method/db.auth/#db.auth) method in the ``$external`` database.

Specify the value ``"PLAIN"`` in the ``mechanism`` field, the user and
password in the ``user`` and ``pwd`` fields respectively, and the
value ``false`` in the ``digestPassword`` field. You **must** specify
``false`` for ``digestPassword`` since the server must receive an
undigested password to forward on to ``saslauthd``, as in the
following example:

```javascript

db.getSiblingDB("$external").auth(
   {
     mechanism: "PLAIN",
     user: <username>,
     pwd:  <cleartext password>,
     digestPassword: false
   }
)

```

The server forwards the password in plain text. In general, use only on
a trusted channel (VPN, TLS/SSL, trusted wired network). See
Considerations.
