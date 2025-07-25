If you need to run a MongoDB deployment on your local machine for development
purposes instead of using an Atlas cluster, you need to complete the following:

1. Download the `Community <https://www.mongodb.com/try/download/community>`__
   or `Enterprise <https://www.mongodb.com/try/download/enterprise>`__ version
   of {+mdb-server+}.

#. :ref:`Install and configure <tutorials-installation>`
   {+mdb-server+}.

#. Start the deployment.

.. important::

   Always secure your MongoDB deployment from malicious attacks. See our
   :manual:`Security Checklist </administration/security-checklist/>` for a
   list of security recommendations.

After you successfully start your MongoDB deployment, specify your connection
string in your driver connection code.

If your MongoDB deployment is running locally, you can use the connection string
``"mongodb://localhost:<port>"`` where ``<port>`` is the port number you
configured your server to listen for incoming connections.

If you need to specify a different hostname or IP address, see our Server
Manual entry on :manual:`Connection Strings </reference/connection-string/>`.
