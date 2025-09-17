To use this example, replace ``<connection-string>`` with the
connection string for your deployment, and then save the file.

.. tabs::
   :hidden: true

   .. tab:: {+service+} {+Cluster+}
      :tabid: cloud

      .. include:: /includes/search-in-community/fact-connection-string-format-drivers.rst
   
      .. note::

         Ensure that your connection string includes your database 
         user's credentials. To learn more about finding your connection string, 
         see :ref:`gswa-connect`. 
      
   .. tab:: Local Deployment
      :tabid: local

      Your connection string should use the following format:

      .. code-block::

         mongodb://localhost:<port-number>/?directConnection=true
