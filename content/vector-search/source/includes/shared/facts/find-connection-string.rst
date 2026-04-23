Replace ``<connection-string>`` with the connection string for your 
|service| cluster or local |service| deployment.

.. tabs::

   .. tab:: Atlas Cluster
      :tabid: cloud

      Your connection string should use the following format:

      .. code-block::

         mongodb+srv://<db_username>:<db_password>@<clusterName>.<hostname>.mongodb.net

      To learn more, see :ref:`connect-via-driver`.

   .. tab:: Local or Self-Managed
      :tabid: local

      Your connection string should use the 
      following format: 

      .. code-block:: 

         mongodb://localhost:<port-number>/?directConnection=true
      
      To learn more, see :manual:`Connection Strings </reference/connection-string/>`.
