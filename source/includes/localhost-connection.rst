If you need to run a MongoDB server on your local machine for development
purposes instead of using an Atlas cluster, you need to complete the following:

1. Download the `Community <https://www.mongodb.com/try/download/community>`__
   or `Enterprise <https://www.mongodb.com/try/download/enterprise>`__ version
   of MongoDB Server.

#. :manual:`Install and configure </installation/>` MongoDB Server.

#. Start the server.

.. important::

   Always secure your MongoDB server from malicious attacks. See our
   :manual:`Security Checklist </administration/security-checklist/>` for a
   list of security recommendations.

After you successfully start your MongoDB server, specify your connection
string in your driver connection code.

If your MongoDB Server is running locally, you can use the following
connection string:

.. code-block:: none

   mongodb://localhost:<port>
   
In this connection string, ``<port>`` is the port number on which you
configured your server to listen for incoming connections.

If you need to specify a different hostname or IP address, see our Server
Manual entry on :manual:`Connection Strings </reference/connection-string/>`.
