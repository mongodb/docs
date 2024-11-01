Replace ``<connection-string>`` with the
connection string for your |service| {+cluster+}
or local deployment, and then save the file.

.. tabs::
   :hidden: true

   .. tab:: {+service+} {+Cluster+}
      :tabid: cloud

      .. include:: /includes/fact-connection-string-format-drivers.rst
   
      .. note::

         Ensure that your connection string includes your database 
         user's credentials. To learn more about finding your connection string, 
         see :ref:`connect-via-driver`. 
      
   .. tab:: Local Deployment
      :tabid: local

      Your connection string should use the following format:

      .. code-block::

         mongodb://localhost:<port-number>/?directConnection=true
