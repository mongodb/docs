If you must run the {+server+} on your local machine for development
purposes, you must complete the following:

1. Follow the :manual:`Install MongoDB </installation/>` tutorial to
   install the {+server+} on your machine. Select the appropriate
   installation tutorial for your machine and operating system.

#. After you complete the installation, start the server.

.. important::

   Always secure your server from malicious attacks. See the
   :manual:`Security Checklist </administration/security-checklist/>` for a
   list of security recommendations.

After you successfully start the {+server+}, connect to your local
instance by performing the following steps:

1. Replace the connection string stored in the ``uri`` variable in the
   :ref:`preceding example <rust-atlas-connection-example>` with the
   connection string for your local MongoDB instance.

   If your {+server+} is running locally, you can use the following
   connection string to connect to MongoDB:

   .. code-block:: none
   
      mongodb://localhost:<port>
   
   In this connection string, ``<port>`` is the port number you
   configured your server to listen for incoming connections.

#. Run the connection code. If the code executes successfully, you should see
   the following output in your console:

   .. code-block:: none
      :copyable: false

      Pinged your deployment. You successfully connected to MongoDB!

.. seealso::

   To learn more about connection strings and custom formats, see
   :manual:`Connection Strings </reference/connection-string/>` in the
   Server manual.
