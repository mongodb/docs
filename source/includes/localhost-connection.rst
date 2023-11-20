To connect to a MongoDB deployment on your local machine, complete the following
steps:

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

If you want to specify a different hostname or IP address, see our Server
Manual entry on :manual:`Connection Strings </reference/connection-string/>`.
