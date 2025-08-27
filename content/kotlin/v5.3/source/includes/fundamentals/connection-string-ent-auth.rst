.. include:: /includes/fundamentals/overview-ent-auth.rst

Specify an Authentication Mechanism
-----------------------------------

.. include:: /includes/fundamentals/auth-specify-enterprise-connection-string.rst

Mechanisms
----------

Kerberos (GSSAPI)
~~~~~~~~~~~~~~~~~~~~~~

The Generic Security Services API (``GSSAPI``) authentication mechanism
allows the user to authenticate to a Kerberos service using the user's
principal name.

.. note::

   The method refers to the ``GSSAPI`` authentication mechanism instead
   of ``Kerberos`` because the driver authenticates using the
   `GSSAPI RFC-4652 <https://tools.ietf.org/html/rfc4752>`_  SASL
   mechanism.

The following code snippets show how to specify the authentication mechanism,
using the following placeholders:

* ``Kerberos principal`` - your URL-encoded principal name, e.g. "username%40REALM.ME"
* ``hostname`` - network address of your MongoDB server, accessible by your client
* ``port`` - port number of your MongoDB server

To specify the GSSAPI authentication mechanism using a connection
string:

- Assign the ``authMechanism`` URL parameter to the value ``GSSAPI``
- *(optional)* Assign the ``authSource`` URL parameter to the value ``$external``

.. note::

   If you specify the ``GSSAPI`` mechanism, you cannot assign
   ``authSource`` to any value other than ``$external``.

Your code to instantiate a ``MongoClient`` should resemble the following:

.. literalinclude:: /examples/generated/EnterpriseAuthTest.snippet.gssapi-connection-string.kt
   :language: kotlin

In order to acquire a
`Kerberos ticket <https://docs.oracle.com/en/java/javase/11/docs/api/java.security.jgss/javax/security/auth/kerberos/KerberosTicket.html>`__,
the GSSAPI Java libraries require you to specify the realm and Key Distribution
Center (KDC) system properties. See the sample settings in the following example:

.. code-block:: none

   java.security.krb5.realm=MYREALM.ME
   java.security.krb5.kdc=mykdc.myrealm.me

You may need to specify one or more of the following additional
``MongoCredential`` mechanism properties depending on your Kerberos setup:

- ``SERVICE_NAME``
- ``CANONICALIZE_HOST_NAME``
- ``JAVA_SUBJECT``
- ``JAVA_SASL_CLIENT_PROPERTIES``
- ``JAVA_SUBJECT_PROVIDER``

.. important::

   You can only specify the following GSSAPI properties using the
   ``MongoCredential``:

   - ``JAVA_SUBJECT``
   - ``JAVA_SASL_CLIENT_PROPERTIES``
   - ``JAVA_SUBJECT_PROVIDER``

   Select the :guilabel:`MongoCredential` selector from the 
   :guilabel:`Connection Mechanism` dropdown to see how to specify them.

To specify one of the GSSAPI additional properties, include it in the
connection string as a URL parameter using the format:
``<PROPERTY_NAME>:<value>``.

Your code to instantiate a ``MongoClient`` using GSSAPI and additional
properties might resemble the following:

.. literalinclude:: /examples/generated/EnterpriseAuthTest.snippet.gssapi-properties-connection-string.kt
   :language: kotlin

By default, the Kotlin driver caches Kerberos tickets by ``MongoClient`` instance.
If your deployment needs to frequently create and destroy ``MongoClient`` instances,
you can change the default Kerberos ticket caching behavior to cache by process
to improve performance.

To cache Kerberos tickets by process, you must use the ``MongoCredential`` authentication
mechanism, as the connection string authentication mechanism does not support the
``JAVA_SUBJECT_PROVIDER`` mechanism property. Select the :guilabel:`MongoCredential`
selector from the :guilabel:`Connection Mechanism` dropdown to learn how to cache Kerberos
tickets by process.

.. note::

   On Windows, Oracle’s JRE uses `LSA <https://docs.microsoft.com/en-us/windows/win32/secauthn/lsa-authentication>`__
   rather than `SSPI <https://docs.microsoft.com/en-us/windows/win32/secauthn/sspi>`__
   in its implementation of GSSAPI which limits interoperability with
   Windows Active Directory and implementations of single sign-on. See the
   following articles for more information:

   - `JDK-8054026 <https://bugs.openjdk.java.net/browse/JDK-8054026>`__
   - `JDK-6722928 <https://bugs.openjdk.java.net/browse/JDK-6722928>`__
   - `SO 23427343
     <https://stackoverflow.com/questions/23427343/cannot-retrieve-tgt-despite-allowtgtsessionkey-registry-entry>`__
   
LDAP (PLAIN)
~~~~~~~~~~~~

*Available in MongoDB Enterprise Edition.*

You can authenticate to a Lightweight Directory Access Protocol (LDAP)
server using your directory server username and password.

.. tip::

   The authentication mechanism is named ``PLAIN`` instead of ``LDAP`` since it
   authenticates using the `PLAIN Simple Authentication and Security Layer
   (SASL) defined in RFC-4616 <https://tools.ietf.org/html/rfc4616>`_.

You can specify this authentication mechanism by setting the ``authMechanism``
parameter to ``PLAIN`` and including your LDAP username and password in the
:manual:`connection string </reference/connection-string/>`.

The following code snippets show how to specify the authentication mechanism,
using the following placeholders:

* ``LDAP username`` - your LDAP username
* ``password`` - your LDAP user's password
* ``hostname`` - network address of your MongoDB server, accessible by your client
* ``port`` - port number of your MongoDB server

To specify the LDAP (PLAIN) authentication mechanism using a connection
string:

- Assign the ``authMechanism`` URL parameter to the value ``PLAIN``
- *(optional)* Assign the ``authSource`` URL parameter to the value ``$external``

.. note::

   If you specify the ``PLAIN`` mechanism, you cannot assign
   ``authSource`` to any value other than ``$external``.

Your code to instantiate a ``MongoClient`` should resemble the following:

.. literalinclude:: /examples/generated/EnterpriseAuthTest.snippet.ldap-connection-string.kt
   :language: kotlin

MONGODB-OIDC
~~~~~~~~~~~~

.. important::

   The MONGODB-OIDC authentication mechanism requires {+mdb-server+} v7.0 or later running
   on a Linux platform.

The following sections describe how to use the MONGODB-OIDC
authentication mechanism to authenticate to various platforms.

For more information about the MONGODB-OIDC authentication mechanism, see
:manual:`OpenID Connect Authentication </core/security-oidc/>` and
:manual:`MongoDB Server Parameters </reference/parameters/#mongodb-parameter-param.oidcIdentityProviders>`
in the MongoDB Server manual.

Azure IMDS
++++++++++

If your application runs on an Azure VM, or otherwise uses the
`Azure Instance Metadata Service <https://learn.microsoft.com/en-us/azure/virtual-machines/instance-metadata-service>`__
(IMDS), you can authenticate to MongoDB by using the {+driver-short+}'s built-in Azure
support.

You can specify Azure IMDS OIDC authentication by specifying your credentials
in the connection string.

Replace the ``<percent-encoded audience>`` placeholder in the
following code with the percent-encoded value of the audience server
parameter configured on your MongoDB deployment.

The comma (``,``) character and its encoding (``%2C``) are
reserved, and using these characters in a value causes the
driver to interpret commas as delimiters of key-value pairs.
You must specify values that contain commas in a ``MongoCredential`` instance.

.. literalinclude:: /examples/generated/EnterpriseAuthTest.snippet.oidc-azure-connection-string.kt
   :language: kotlin

GCP IMDS
++++++++

If your application runs on a Google Compute Engine VM, or otherwise uses the
`GCP Instance Metadata Service <https://cloud.google.com/compute/docs/metadata/querying-metadata>`__,
you can authenticate to MongoDB by using the {+driver-short+}'s built-in GCP
support.

You can specify GCP IMDS OIDC authentication by specifying your credentials
in the connection string.

Replace the ``<percent-encoded audience>`` placeholder in the
following code with the percent-encoded value of the audience server
parameter configured on your MongoDB deployment.

The comma (``,``) character and its encoding (``%2C``) are
reserved, and using these characters in a value causes the
driver to interpret commas as delimiters of key-value pairs.
You must specify values that contain commas in a ``MongoCredential`` instance.

.. literalinclude:: /examples/generated/EnterpriseAuthTest.snippet.oidc-gcp-connection-string.kt
   :language: kotlin

Kubernetes
++++++++++

If your application runs on a Kubernetes cluster, you can authenticate
to MongoDB by using the {+driver-short+}'s built-in Kubernetes support.

To specify Kubernetes OIDC as the authentication mechanism, set the following 
options in your connection string:

- ``authMechanism``: Set to ``MONGODB-OIDC``.
- ``authMechanismProperties``: Set to ``ENVIRONMENT:k8s``. 

Replace the ``<percent-encoded audience>`` placeholder in the
following code with the percent-encoded value of the audience server
parameter configured on your MongoDB deployment.

Custom Callback
+++++++++++++++

The {+driver-short+} doesn't offer built-in support for all platforms, including
Azure Functions and Azure Kubernetes Service (AKS). Instead, you
must define a custom callback to use OIDC to authenticate from these platforms.
To do so, use the ``"OIDC_CALLBACK"`` authentication property, as shown in the following
code example:

.. literalinclude:: /examples/generated/EnterpriseAuthTest.snippet.oidc-callback.kt
   :language: kotlin

The value of the ``"OIDC_CALLBACK"`` property must be a lambda or other implementation
of the ``OidcCallback`` functional interface that accepts an ``OidcCallbackContext``
as a parameter and returns an ``OidcCallbackResult``.

The following example uses an example callback to retrieve an OIDC token from a file
named ``"access-token.dat"`` in the local file system:

.. literalinclude:: /examples/generated/EnterpriseAuthTest.snippet.oidc-callback-file.kt
   :language: kotlin