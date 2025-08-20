Overview
--------

The Generic Security Services API (GSSAPI) authentication mechanism allows you to
use your principal name to authenticate to a Kerberos service.
You can use this mechanism only when authenticating to MongoDB Enterprise Advanced.

Code Placeholders 
~~~~~~~~~~~~~~~~~

The code examples on this page use the following placeholders:

- ``<principal_username>``: Your :wikipedia:`URL-encoded <Percent-encoding>` principal name. For
  example: ``"username%40REALM.ME"``
- ``<hostname>``: The network address of your MongoDB deployment.
- ``<port>``: The port number of your MongoDB deployment. If you omit this parameter,
  the driver uses the default port number (``27017``).

To use the code examples, replace these placeholders with your own values.

Specify the GSSAPI Authentication Mechanism
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To specify the GSSAPI authentication mechanism by using a connection
string, perform the following actions:

- Assign the ``authMechanism`` URL parameter to the value ``GSSAPI``
- (*optional*) Assign the ``authSource`` URL parameter to the value ``$external``

.. note::

   If you specify the ``GSSAPI`` mechanism, you cannot assign
   ``authSource`` to any value other than ``$external``.

The code to instantiate a ``MongoClient`` resembles the following:

.. code-block:: java

   MongoClient mongoClient =
   MongoClients.create("<principal_username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI");
   
To acquire a `Kerberos ticket <https://docs.oracle.com/en/java/javase/11/docs/api/java.security.jgss/javax/security/auth/kerberos/KerberosTicket.html>`__,
the GSSAPI Java libraries require you to specify the realm and Key Distribution
Center (KDC) system properties. See the sample settings in the following example:

.. code-block:: none

   java.security.krb5.realm=MYREALM.ME
   java.security.krb5.kdc=mykdc.myrealm.me
  
Additional Properties
~~~~~~~~~~~~~~~~~~~~~

You might need to specify one or more of the following
``MongoCredential`` mechanism properties depending on your Kerberos setup:

- ``SERVICE_NAME``
- ``CANONICALIZE_HOST_NAME``
- ``JAVA_SUBJECT``
- ``JAVA_SASL_CLIENT_PROPERTIES``
- ``JAVA_SUBJECT_PROVIDER``

.. important::

   You can specify the following GSSAPI properties only by using the
   ``MongoCredential``:

   - ``JAVA_SUBJECT``
   - ``JAVA_SASL_CLIENT_PROPERTIES``
   - ``JAVA_SUBJECT_PROVIDER``

   Select the :guilabel:`MongoCredential` connection mechanism to see how to specify
   them.

To specify one of the GSSAPI additional properties, include it in the
connection string as a URL parameter. Use the format:
``<PROPERTY_NAME>:<value>``.

Your code to instantiate a ``MongoClient`` by using GSSAPI and additional
properties might resemble the following:

.. code-block:: java

   MongoClient mongoClient =
   MongoClients.create("<principal_username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService");

Configure Caching Behavior
~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, the Java driver caches Kerberos tickets by ``MongoClient`` instance.
If your deployment needs to frequently create and destroy ``MongoClient`` instances,
you can change the default Kerberos ticket caching behavior to cache by process
to improve performance.

To cache Kerberos tickets by process, you must use the ``MongoCredential`` authentication
mechanism, as the connection string authentication mechanism does not support the ``JAVA_SUBJECT_PROVIDER``
mechanism property. If you would like to cache Kerberos tickets by process, select the :guilabel:`MongoCredential`
tab to learn how to accomplish this.

.. note::

   On Windows, Oracle's JRE uses `LSA <https://docs.microsoft.com/en-us/windows/win32/secauthn/lsa-authentication>`__
   rather than `SSPI <https://docs.microsoft.com/en-us/windows/win32/secauthn/sspi>`__
   in its implementation of GSSAPI, which limits interoperability with
   Windows Active Directory and implementations of single sign-on. For more
   information, see the following resources:

   - `JDK-8054026 <https://bugs.openjdk.java.net/browse/JDK-8054026>`__
   - `JDK-6722928 <https://bugs.openjdk.java.net/browse/JDK-6722928>`__
   - `SO 23427343 <https://stackoverflow.com/questions/23427343/cannot-retrieve-tgt-despite-allowtgtsessionkey-registry-entry>`__
   
API Documentation
-----------------

To learn more about any of the methods or types discussed on this
page, see the following API documentation:

- `MongoClient <{+driver-api+}/MongoClient.html>`__
- `MongoCredential <{+core-api+}/MongoCredential.html>`__
- `MongoCredential.createGSSAPICredential() <{+core-api+}/MongoCredential.html#createGSSAPICredential(java.lang.String)>`__
- `MongoCredential.withMechanismProperty() <{+core-api+}/MongoCredential.html#withMechanismProperty(java.lang.String,T)>`__