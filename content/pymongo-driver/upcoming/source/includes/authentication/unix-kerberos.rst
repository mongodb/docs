.. include::  /includes/authentication/kerberos-intro.rst

Using GSSAPI Authentication in Your Application
-----------------------------------------------

To use GSSAPI authentication in your application, follow the steps below.

1. Use pip or easy_install to install the Python
   `kerberos <http://pypi.python.org/pypi/kerberos>`__ or
   `pykerberos <https://pypi.python.org/pypi/pykerberos>`__ module.

   .. warning:: Kerberos Limitation

      The ``kerberos`` module does not support free-threaded
      Python.

#. Run the ``kinit`` command to obtain and cache
   an initial ticket-granting ticket. The following example uses the
   ``kinit`` command to obtain a ticket-granting ticket for the principal
   ``mongodbuser@EXAMPLE.COM``. It then uses the ``klist``
   command to display the principal and ticket in the credentials cache.

   .. code-block:: sh
      :copyable: false

      $ kinit mongodbuser@EXAMPLE.COM
      mongodbuser@EXAMPLE.COM's Password:
      $ klist
      Credentials cache: FILE:/tmp/krb5cc_1000
              Principal: mongodbuser@EXAMPLE.COM

        Issued                Expires               Principal
      Feb  9 13:48:51 2013  Feb  9 23:48:51 2013  krbtgt/mongodbuser@EXAMPLE.COM

#. After you obtain a ticket-granting ticket, set the following connection options:

   - ``username``: The Kerberos principal to authenticate. Percent-encode this value
     before including it in a connection URI.
   - ``authMechanism``: Set to ``"GSSAPI"``.
   - ``authMechanismProperties``: Optional. By default, MongoDB uses ``mongodb`` as
     the authentication service name. To specify a different service name, set
     this option to ``"SERVICE_NAME:<authentication service name>"``.

You can set these options in two ways: by passing arguments to the
``MongoClient`` constructor or through parameters in your connection
string. Select the tab that corresponds to your connection method to learn how
to set connection options.

.. include:: /includes/authentication/auth-properties-commas.rst

.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<hostname>:<port>",
                                      username="mongodbuser@EXAMPLE.COM",
                                      authMechanism="GSSAPI",
                                      authMechanismProperties="SERVICE_NAME:<authentication service name>")

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = ("mongodb://mongodbuser%40EXAMPLE.COM@<hostname>:<port>/?"
                "&authMechanism=GSSAPI"
                "&authMechanismProperties=SERVICE_NAME:<authentication service name>")
         client = pymongo.MongoClient(uri)
   
   .. tab:: MongoClient (Asynchronous)
      :tabid: mongoclient-async

      .. code-block:: python

         client = pymongo.AsyncMongoClient("mongodb://<hostname>:<port>",
                                           username="mongodbuser@EXAMPLE.COM",
                                           authMechanism="GSSAPI",
                                           authMechanismProperties="SERVICE_NAME:<authentication service name>")
   
   .. tab:: Connection String (Asynchronous)
      :tabid: connectionstring-async

      .. code-block:: python

         uri = ("mongodb://mongodbuser%40EXAMPLE.COM@<hostname>:<port>/?"
                "&authMechanism=GSSAPI"
                "&authMechanismProperties=SERVICE_NAME:<authentication service name>")
         client = pymongo.AsyncMongoClient(uri)

API Documentation
-----------------

To learn more about using authentication mechanisms with {+driver-short+},
see the following API documentation:

- `MongoClient <{+api-root+}pymongo/mongo_client.html#pymongo.mongo_client.MongoClient>`__