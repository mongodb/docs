+++
title = "Authenticate Using SASL and LDAP with ActiveDirectory"

[tags]
mongodb = "product"
+++
# Authenticate Using SASL and LDAP with ActiveDirectory


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


### Step 3: Configure LDAP Options with ActiveDirectory.

If the ``saslauthd.conf`` file does not exist, create it.
The ``saslauthd.conf`` file usually resides in the ``/etc``
folder. If specifying a different file path, see the
[-O option](http://www.linuxcommand.org/man_pages/saslauthd8.html) of
``saslauthd``.

To use with ActiveDirectory, start ``saslauthd`` with the following
configuration options set in the ``saslauthd.conf`` file:

```

ldap_servers: <ldap uri>
ldap_use_sasl: yes
ldap_mech: DIGEST-MD5
ldap_auth_method: fastbind

```

For the ``<ldap uri>``, specify the uri of the ldap server. For
example, ``ldap_servers: ldaps://ad.example.net``.

For more information on ``saslauthd`` configuration, see
[http://www.openldap.org/doc/admin24/guide.html#Configuringsaslauthd](http://www.openldap.org/doc/admin24/guide.html#Configuringsaslauthd).


### Step 4: Test the ``saslauthd`` configuration.

Use ``testsaslauthd`` utility to test the ``saslauthd``
configuration. For example:

```sh

testsaslauthd -u testuser -p testpassword -f /var/run/saslauthd/mux

```

Note: ``/var/run/saslauthd`` directory must have permissions set to ``755`` for MongoDB to successfully authenticate. 


## Configure MongoDB


### Step 1: Add user to MongoDB for authentication.

Add the user to the ``$external`` database in MongoDB. To specify the
user's privileges, assign [roles](#) to the
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
[User Management Commands](#).


### Step 2: Configure MongoDB server.

To configure the MongoDB server to use the ``saslauthd`` instance for
proxy authentication, start the [``mongod``](#bin.mongod) with the following
options:

* [``--auth``](#cmdoption-auth), 

* [``authenticationMechanisms``](#param.authenticationMechanisms) parameter set to ``PLAIN``, and 

* [``saslauthdPath``](#param.saslauthdPath) parameter set to the path to the Unix-domain Socket of the ``saslauthd`` instance. 

Configure the MongoDB server using either the command line option
[--setParameter](#) or the
[configuration file](#). Specify
additional configurations as appropriate for your configuration.

If you use the [``authorization``](#security.authorization) option to enforce
authentication, you will need privileges to create a user.


#### Use specific ``saslauthd`` socket path.

For socket path of ``/<some>/<path>/saslauthd``, set the
[``saslauthdPath``](#param.saslauthdPath) to ``/<some>/<path>/saslauthd/mux``,
as in the following command line example:

```

mongod --auth --setParameter saslauthdPath=/<some>/<path>/saslauthd/mux --setParameter authenticationMechanisms=PLAIN

```

Or if using a [YAML format configuration file](#), specify the following settings in
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
[``saslauthdPath``](#param.saslauthdPath) to the empty string ``""``, as in the
following command line example:

```

mongod --auth --setParameter saslauthdPath="" --setParameter authenticationMechanisms=PLAIN

```

Or if using a [YAML format configuration file](#), specify the following settings in
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

To perform the authentication in the [``mongo``](#bin.mongo) shell, use the
[``db.auth()``](#db.auth) method in the ``$external`` database.

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
