GSSAPI (Kerberos) Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. important::

   The Java driver maintainers have only confirmed the content of this
   document on Linux using Java 6 and Java 7, on OS X using Java 7,
   and on Windows with SSPI using Java 7.

   These features are only present in `MongoDB Enterprise
   <https://www.mongodb.com/products/mongodb-enterprise>`_.

To authenticate to a MongoDB cluster using Kerberos, you must supply
the Kerberos user name and specify the Kerberos authentication
mechanism:

.. code-block:: java

   MongoCredential credential = MongoCredential.createGSSAPICredential("user1@MYREALM.ME");

   MongoClient mongoClient = new MongoClient(new ServerAddress(server), Arrays.asList(credential));

With Kerberos you specify neither the password nor the database name,
as authentication is performed via the Kerberos key distribution
center (KDC).

To actually run a program that authenticates with Kerberos, you will
typically need to specify several system properties so that the
underlying GSSAPI Java libraries can acquire a Kerberos ticket:

.. code-block:: properties

   java.security.krb5.realm=MYREALM.ME
   java.security.krb5.kdc=mykdc.myrealm.me

.. note::

   Many authentication problems with GSSAPI/Kerberos occur due to
   mismatches between server realm names. In general, you should
   specify exactly the same hostname as used as the realm name in your
   Kerberos configuration when creating GSSAPI credentials.

   You can force canonicalization of the hostname provided to the
   driver by adding a mechanism property to the GSSAPI
   ``MongoCredential``, which can be useful if your realm is a
   fully-qualified domain name and you are using an IP address or
   alias:

   .. code-block:: java

      MongoCredential credential = MongoCredential.createGSSAPICredential("user1@MYREALM.ME").withMechanismProperty("CANONICALIZE_HOST_NAME",true);

   You should note, however, that if your deployment is not using
   secured DNS lookups, it is possible for an attacker to pose as the
   Kerberos principal you are attempting to communicate with.
