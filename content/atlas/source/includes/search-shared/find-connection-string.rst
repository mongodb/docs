.. NOTE: we need to update this to include self-hosted deployments when Search Community edition releases

Replace ``<connection-string>`` with the connection string for your 
|service| cluster or local |service| deployment.

.. tabs::

   .. tab:: Atlas Cluster
      :tabid: cloud

      .. include:: /includes/fact-connection-string-format-drivers.rst

      To learn more, see :ref:`connect-via-driver`.

   .. tab:: Local Deployment
      :tabid: local

      Your connection string should use the 
      following format: 

      .. code-block:: 

         mongodb://localhost:<port-number>/?directConnection=true
      
      To learn more, see :manual:`Connection Strings </reference/connection-string/>`.

      