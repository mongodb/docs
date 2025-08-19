If you must run a MongoDB server on your local machine for development
purposes, complete the following steps:

1. Download the `Community <https://www.mongodb.com/try/download/community>`__
   or `Enterprise <https://www.mongodb.com/try/download/enterprise>`__ version
   of MongoDB Server.

#. :ref:`Install and configure <tutorials-installation>` MongoDB Server.

#. Start the server.

.. important::

   Always secure your MongoDB server from malicious attacks. See the
   :manual:`Security Checklist </administration/security-checklist/>` in the
   Server manual for a list of security recommendations.

After you successfully start your MongoDB server, specify your connection
string in your driver connection code.

If your MongoDB Server is running locally, you can use the connection string
``"mongodb://localhost:<port>"`` where ``<port>`` is the port number you
configured your server to listen for incoming connections.

For more information on how to specify a different hostname or IP address, see
:manual:`Connection Strings </reference/connection-string/>` in the Server
manual.