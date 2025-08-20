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

To specify the GSSAPI authentication mechanism by using the
``MongoCredential`` class, use the ``createGSSAPICredential()``
method. The code to instantiate a ``MongoClient`` resembles
the following:

.. include:: /includes/fundamentals/code-snippets/auth-credentials-gssapi.rst

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

To specify one of the GSSAPI additional properties, call the
``withMechanismProperty()`` method on your ``MongoCredential``
instance and pass the property name and value as parameters. Use the
property name constants defined in the ``MongoCredential`` class:

- `SERVICE_NAME_KEY <{+core-api+}/MongoCredential.html#SERVICE_NAME_KEY>`__
- `CANONICALIZE_HOST_NAME_KEY <{+core-api+}/MongoCredential.html#CANONICALIZE_HOST_NAME_KEY>`__
- `JAVA_SUBJECT_KEY <{+core-api+}/MongoCredential.html#JAVA_SUBJECT_KEY>`__
- `JAVA_SASL_CLIENT_PROPERTIES_KEY <{+core-api+}/MongoCredential.html#JAVA_SASL_CLIENT_PROPERTIES_KEY>`__
- `JAVA_SUBJECT_PROVIDER_KEY <{+core-api+}/MongoCredential.html#JAVA_SUBJECT_PROVIDER_KEY>`__

Select the **SERVICE_NAME_KEY** or **JAVA_SUBJECT_KEY** tab to
see sample code to instantiate a ``MongoCredential`` that uses GSSAPI and
the selected property:

.. tabs::

   .. tab::
      :tabid: SERVICE_NAME_KEY

      .. include:: /includes/fundamentals/code-snippets/auth-credentials-gssapi-properties.rst

   .. tab::
      :tabid: JAVA_SUBJECT_KEY

      .. include:: /includes/fundamentals/code-snippets/auth-credentials-gssapi-subject-key.rst

Configure Caching Behavior
~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, the Java driver caches Kerberos tickets by ``MongoClient`` instance.
If your deployment needs to frequently create and destroy ``MongoClient`` instances,
you can change the default Kerberos ticket caching behavior to cache by process
to improve performance.

To cache Kerberos tickets by process, you must specify the ``JAVA_SUBJECT_PROVIDER``
mechanism property and provide a
`KerberosSubjectProvider <https://mongodb.github.io/mongo-java-driver/4.2/apidocs/mongodb-driver-core/com/mongodb/KerberosSubjectProvider.html#%3Cinit%3E()>`__
in your ``MongoCredential`` instance. The code to configure the Java driver to cache Kerberos tickets
by process resembles the following:

.. include:: /includes/fundamentals/code-snippets/auth-credentials-gssapi-ticket-cache.rst

.. note::

   On Windows, Oracle's JRE uses `LSA <https://docs.microsoft.com/en-us/windows/win32/secauthn/lsa-authentication>`__
   rather than `SSPI <https://docs.microsoft.com/en-us/windows/win32/secauthn/sspi>`__
   in its implementation of GSSAPI which limits interoperability with
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