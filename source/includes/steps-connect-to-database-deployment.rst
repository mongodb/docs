.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.
      
   .. step:: Choose how you want to limit connections to your {+database-deployment+}.
      
      .. tabs::
         :hidden:
      
         .. tab:: Standard Connection
            :tabid: standard
      
            :guilabel:`Add a Connection IP Address`
      
            .. important::
      
               Skip this step if |service| indicates in the
               :guilabel:`Setup connection security` step that you have
               already configured an IP access list entry in your {+database-deployment+}.
               To manage the IP access list, see
               :ref:`Add Entries to the Access List <access-list>`.
      
            |service| allows standard client connections to the {+database-deployment+}
            from entries in the :ref:`project's IP access list
            <access-list>`. The project IP access list differs from the
            :ref:`API access list <enable-api-access-list>`, which
            restricts *API* access to specific IP or |cidr| addresses.
      
            If the IP access list is empty, |service| prompts you to add an
            IP address to the project's IP access list. You can either:
      
            - Click :guilabel:`Add Your Current IP Address` to allow
              access from your current IP address.
      
            - Click :guilabel:`Add an IP Address` to add a single IP
              address or a |cidr|\-notated range of addresses.
      
            Provide an optional description for the newly added IP address
            or |cidr| range. Click :guilabel:`Add IP Address` to add the
            address to the IP access list.
      
         .. tab:: Private IP for Peering
            :tabid: peering
      
            :guilabel:`Add a Connection IP Address`
      
            .. important::
      
               Skip this step if |service| indicates in the
               :guilabel:`Setup connection security` step that you have
               already configured an IP access list entry in your {+database-deployment+}.
               To manage the IP access list, see :ref:`Add Entries to the
               IP access list <access-list>`.
      
            |service| allows standard client connections to the cluster
            from entries in the :ref:`project's IP access list
            <access-list>`. The project IP access list differs from the
            :ref:`API access list <enable-api-access-list>`, which
            restricts *API* access to specific IP or |cidr| addresses.
      
            If the IP access list is empty, |service| prompts you to add an
            IP address to the project's IP access list. Click
            :guilabel:`Add a Different IP Address` to add a single IP
            address or a |cidr|\-notated range of addresses.
      
            Provide an optional description for the newly added IP address
            or |cidr| range. Click :guilabel:`Add IP Address` to add the
            address to the IP access list.
      
         .. tab:: Private Endpoint Connection
            :tabid: private
      
            a. Under :guilabel:`Choose Connection Type`, select
               :guilabel:`Private Endpoint`.
      
            #. If you see the :guilabel:`Private Link Type` options,
               select one of the following options:
               
               - :guilabel:`Optimized SRV Connection` for 
                 load-balanced connections.
               - :guilabel:`Legacy SRV Connection` for
                 non-load-balanced connections. 
               
               To learn more, see :ref:`optimized-connection-strings`.
      
            #. Under :guilabel:`Choose Private Endpoint`, select the
               endpoint you want to use.
      
   .. step:: Create a Database User.
      
      .. important::
      
         **Skip this step** if |service| indicates in the
         :guilabel:`Setup connection security` step that you have at least
         one database user configured in your project. To manage existing
         database users, see :ref:`mongodb-users`.
      
      To access the {+database-deployment+}, you need a MongoDB user with access to the
      desired database or databases on the {+database-deployment+} in your project. If your
      project has no MongoDB users, |service| prompts you to create a new
      user with the :ref:`Atlas Admin <atlas-user-privileges>` role.
      
      a. Enter the new user's :guilabel:`Username`.
      b. Enter a :guilabel:`Password` for this new user or click
         :guilabel:`Autogenerate Secure Password`.
          
      c. Click :guilabel:`Create Database User` to save the user.
      
      Use this user to connect to your {+database-deployment+} in the following step.
      
      Once you have added an IP address to your IP access list and added a
      database user, click :guilabel:`Choose Your Connection Method`.
      
   .. step:: Click :guilabel:`Choose a connection method`.
