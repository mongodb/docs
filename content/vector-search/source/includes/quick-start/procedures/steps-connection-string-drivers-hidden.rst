.. Changes to this file must also be applied to:
   content/atlas/source/includes/steps-connection-string-drivers-hidden.rst

.. tabs::
   :hidden: true

   .. tab:: {+service+} Cluster
      :tabid: cloud

      .. include:: /includes/shared/facts/find-connection-string.rst
   
      :gold:`IMPORTANT:` Ensure that your connection string includes your database 
      user's credentials. To learn more about finding your connection string, 
      see :ref:`connect-via-driver`. 
      
   .. tab:: Local Deployment
      :tabid: local
      
      Your connection string should use the following format:

      .. code-block::

         mongodb://localhost:<port-number>/?directConnection=true
