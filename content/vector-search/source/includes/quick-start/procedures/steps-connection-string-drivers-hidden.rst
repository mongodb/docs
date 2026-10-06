.. tabs::

   .. tab:: {+service+} Cluster
      :tabid: cloud

      Replace ``<connection-string>`` with the connection string for
      your {+service+} cluster. Your connection string should use the
      following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

      :gold:`IMPORTANT:` Ensure that your connection string includes
      your database user's credentials. To learn more about finding
      your connection string, see :ref:`connect-via-driver`.

   .. tab:: Local Deployment
      :tabid: local

      Replace ``<connection-string>`` with the connection string for
      your local {+service+} deployment. Your connection string should
      use the following format:

      .. code-block::

         mongodb://localhost:<port-number>/?directConnection=true

      To learn more, see :ref:`Connection Strings <mongodb-uri>`.
