.. :snippet-start: find-connection-string
.. :snippet-output: content/search/source/includes/shared/facts/find-connection-string.rst, content/vector-search/source/includes/shared/facts/find-connection-string.rst

Replace ``<connection-string>`` with the connection string for your
|service| cluster or local |service| deployment.

.. tabs::

   .. tab:: Atlas Cluster
      :tabid: cloud

      Your connection string should use the following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

      :gold:`IMPORTANT:` Ensure that your connection string includes
      your database user's credentials. To learn more about finding
      your connection string, see :ref:`connect-via-driver`.

   .. tab:: Local or Self-Managed
      :tabid: local

      Your connection string should use the
      following format:

      .. code-block::

         mongodb://localhost:<port-number>/?directConnection=true

      To learn more, see :manual:`Connection Strings
      </reference/connection-string/>`.

.. :snippet-end:
