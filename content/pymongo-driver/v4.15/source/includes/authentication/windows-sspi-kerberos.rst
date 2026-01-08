.. include::  /includes/authentication/kerberos-intro.rst

Using GSSAPI Authentication in Your Application
-----------------------------------------------

To use GSSAPI authentication in your application, follow the steps below.

1. Install the `winkerberos <https://pypi.python.org/pypi/winkerberos/>`__ module.
#. Set the following connection options:

   - ``username``: The Kerberos principal to authenticate. Percent-encode this value before including
     it in a connection URI.
   - ``authMechanism``: Set to ``"GSSAPI"``.
   - ``password``: Optional. If the user to authenticate is different from the user
     that owns the application process, set this option to the authenticating user's
     password.
   - ``authMechanismProperties``: Optional. This option includes multiple
     authentication properties. To specify more than one of the following properties,
     use a comma-delimited list.
     
     - ``SERVICE_NAME``: By default, MongoDB uses ``mongodb`` as
       the authentication service name. Use this option to specify a different service name.
     - ``CANONICALIZE_HOST_NAME``: Whether to use the fully qualified domain name (FQDN)
       of the MongoDB host for the server principal.
     - ``SERVICE_REALM``: The service realm. Use this option when the user's
       realm is different from the service's realm.

You can set these options in two ways: by passing arguments to the
``MongoClient`` constructor or through parameters in your connection string. Select the tab that corresponds to your connection method to learn how
to set connection options.

.. tabs::

   .. tab:: MongoClient
      :tabid: mongoclient

      .. code-block:: python

         client = pymongo.MongoClient("mongodb://<hostname>:<port>",
                                      username="mongodbuser@EXAMPLE.COM",
                                      authMechanism="GSSAPI",
                                      password="<user password>",
                                      authMechanismProperties="SERVICE_NAME:<authentication service name>,
                                          CANONICALIZE_HOST_NAME:true,
                                          SERVICE_REALM:<service realm>")

   .. tab:: Connection String
      :tabid: connectionstring

      .. code-block:: python

         uri = ("mongodb://mongodbuser%40EXAMPLE.COM:<percent-encoded user password>"
                "@<hostname>:<port>/?"
                "&authMechanism=GSSAPI"
                "&authMechanismProperties="
                  "SERVICE_NAME:<authentication service name>,"
                  "CANONICALIZE_HOST_NAME:true,"
                  "SERVICE_REALM:<service realm>")
         client = pymongo.MongoClient(uri)
   
   .. tab:: MongoClient (Asynchronous)
      :tabid: mongoclient-async

      .. code-block:: python

         client = pymongo.AsyncMongoClient("mongodb://<hostname>:<port>",
                                           username="mongodbuser@EXAMPLE.COM",
                                           authMechanism="GSSAPI",
                                           password="<user password>",
                                           authMechanismProperties="SERVICE_NAME:<authentication service name>,
                                               CANONICALIZE_HOST_NAME:true,
                                               SERVICE_REALM:<service realm>")

   .. tab:: Connection String (Asynchronous)
      :tabid: connectionstring-async

      .. code-block:: python

         uri = ("mongodb://mongodbuser%40EXAMPLE.COM:<percent-encoded user password>"
                "@<hostname>:<port>/?"
                "&authMechanism=GSSAPI"
                "&authMechanismProperties="
                  "SERVICE_NAME:<authentication service name>,"
                  "CANONICALIZE_HOST_NAME:true,"
                  "SERVICE_REALM:<service realm>")
         client = pymongo.AsyncMongoClient(uri)

API Documentation
-----------------

To learn more about using authentication mechanisms with {+driver-short+},
see the following API documentation:

- `MongoClient <{+api-root+}pymongo/mongo_client.html#pymongo.mongo_client.MongoClient>`__