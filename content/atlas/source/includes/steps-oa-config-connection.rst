.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. include:: /includes/nav/steps-online-archive.rst
      
   .. step:: Click the :guilabel:`Connect` button for the Online Archive to which you want to connect.
      
   .. step:: Configure your connection type.
      To configure the type of connection:
      
      a. Choose one of the following options: 
      
         - :guilabel:`Standard connection`
      
         - :guilabel:`Private endpoint` 
      
      b. Set up your type of connection. To set up, for:
      
         .. tabs:: 
      
            .. tab:: Standard Connection 
               :tabid: standard 
      
               Click: 
      
               - :guilabel:`Add your current IP address` to add your 
                 current IP address to the list of allowed IP addresses.
               - :guilabel:`Add a different IP address` to specify the 
                 IP address to add to the list of allowed IP addresses.
               - :guilabel:`Allow access from anywhere` to allow access 
                 from all IP addresses. 
      
            .. tab:: Private Endpoint 
               :tabid: pvt-endpoint
      
               Click :guilabel:`Private endpoint` and: 
      
               - :ref:`Create new endpoint <oa-config-private-endpoint>`
               - :ref:`Add existing endpoint <oa-config-private-endpoint>`
               - Use a private endpoint already :ref:`configured 
                 <oa-config-private-endpoint>` for online archives
      
         .. note:: 
      
            If you specify ``0.0.0.0`` in the IP access list, |service|  
            accepts all connections including those over PrivateLink.
      
   .. step:: Create a database user for your online archive.
      
      To create a database user for your online archive:
      
      a. Specify :guilabel:`Username`. 
      b. Enter :guilabel:`Password` or click :guilabel:`Autogenerate secure 
         password`.
      c. Click :guilabel:`Create database user`.
      
   .. step:: Click :guilabel:`Next` to get the connection string for your online archive.
