In your application file, replace the ``<connection string URI>``
placeholder with the :manual:`connection string </reference/connection-string/>`
that you saved when you created your deployment. Your connection string
has the following format:

.. tabs::

   .. tab:: Local Deployment
      :tabId: local

      .. code-block:: shell

         mongodb://localhost:<port number>/?directConnection=true

      Replace the ``<port number>`` placeholder with the port number
      of your local deployment. Your port number can be found in Docker
      Desktop.

   .. tab:: Cloud Deployment
      :tabId: cloud

      .. code-block:: shell

         mongodb+srv://<database user>:<database password>@<cluster address>

      Replace the following placeholder values:

      - ``<database user>``: The database username you
        specified when creating your deployment.
      - ``<database password>``: The password for the database
        user.
      - ``<cluster address>``: The SRV address for your
        cluster. You can view your cluster address in the
        connection string you saved after creating your deployment, or by running
        ``atlas clusters connectionStrings describe myDeployment`` in
        your terminal and copying the text after the ``mongodb+srv://``
        prefix.