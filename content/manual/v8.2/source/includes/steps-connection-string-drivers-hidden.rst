.. tabs::
   :hidden: true

   .. tab:: {+service+} {+Cluster+}
      :tabid: cloud

      .. include:: /includes/fact-connection-string-format-drivers.rst
   
      .. note::

         Ensure that your connection string includes your database 
         user's credentials. To learn more about finding your connection string, 
         see :ref:`connect-via-driver`. 

      If you are connecting to a deployment in Docker, your connection string 
      must use the :ref:`standard format <connections-standard-connection-string-format>` 
      and specify ``directConnection=true``. For details, see :urioption:`directConnection`.
      
   .. tab:: Local Deployment
      :tabid: local
      
      Your connection string should use the following format:

      .. code-block::

         mongodb://localhost:<port-number>/?directConnection=true
