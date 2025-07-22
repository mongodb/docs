.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.
      
   .. step:: Choose your Connection Type.


      |service| displays the connection type options after you enable
      :doc:`Private IP for Peering </security-vpc-peering>`,
      :ref:`Private Endpoint <atlas-configure-private-endpoint>`, or
      both. If you haven't enabled either feature, no buttons display
      and **Connection Type** defaults to **Standard**.

      Under :guilabel:`Choose Connection Type`, select one of the following connection types: 

      .. tabs::
      
         .. tab:: Standard Connection
            :tabid: standard
      
            Use this connection type for allowed public IP addresses. If you are
            connecting directly to |service| from an office or home network, this might be the preferred option.
      
         .. tab:: Private IP for Peering
            :tabid: peering
      
            Use this connection type if you enabled peering:
      
            - For |gcp| or |azure| and are connecting with Compass
              from a peered network
            - For |aws| and are connecting with Compass from a
              peered network which uses a custom |dns| service
      
            .. note:: Peer must be available
      
               You can't select this option unless one of your peers
               is marked as ``AVAILABLE``. To learn how to check the status of your peers, 
               see :ref:`view-network-peer-connection`. 
      
            .. note:: Multi-Cloud Clusters
      
               If your application isn't hosted on the same cloud service
               provider as your cluster's :term:`primary`, the application
               can only perform secondary reads.
      
               With multi-cloud clusters, consider adding the
               :manual:`readPreference </reference/connection-string#read-preference-options>`
               connection option to your
               :manual:`connection string </reference/connection-string>`.
               Use one of the following values:
      
               - :readmode:`primaryPreferred`
               - :readmode:`secondary`
               - :readmode:`secondaryPreferred`
      
         .. tab:: Private Endpoint Connection
            :tabid: private
      
            Use the connection string for the appropriate interface
            endpoint if you are connecting with Compass over a
            private endpoint connection because:
      
            - |compass| runs inside your cloud provider network
            - |compass| has transitive network access to your cloud provider network
            - You want to use an :ref:`optimized connection string <optimized-connection-strings>`.
      
            :red:`WARNING:` You can't select this option unless your configured
            PrivateLink connection is ready to use. To learn how to
            check the status of your {+aws-pl+}, see :ref:`atlas-troubleshoot-private-endpoint`. 
      
   .. step:: Choose how you want to limit connections to your {+database-deployment+}.

      .. tabs::
         :hidden:
      
         .. tab:: Standard Connection
            :tabid: standard
      
            :guilabel:`Add a Connection IP Address`
      
            :gold:`IMPORTANT:` Skip this step if |service| indicates in the
            :guilabel:`Setup connection security` step that you have
            already configured an IP access list entry in your {+database-deployment+}.
            To manage the IP access list, see :ref:`access-list`.
      
            |service| allows standard client connections to the {+database-deployment+}
            from entries in the project's :ref:`IP access list <access-list>`.
            The project IP access list differs from the
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
      
            :gold:`IMPORTANT:` Skip this step if |service| indicates in the
            :guilabel:`Setup connection security` step that you have
            already configured an IP access list entry in your {+database-deployment+}.
            To manage the IP access list, see :ref:`access-list`.
      
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
      
      :gold:`IMPORTANT:` **Skip this step** if |service| indicates in the
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
      
   .. step:: Get the Connection String for |compass| from |service|.
      
      a. Click :guilabel:`I have MongoDB Compass`.
      
      #. Choose your version of |compass| in the dropdown. To check
         the version of |compass| that you have installed on your system,
         click :guilabel:`About MongoDB Compass` in the application.
      
      #. Copy the connection string presented in the |service|
         :guilabel:`Connect` dialog box.
      
   .. step:: Open |compass| and Connect to |service|.
      
      .. tabs::
      
         .. tab:: Paste Connection String
            :tabid: paste
      
            Use the copied connection string for connecting to |compass| if
            your deployment uses a single cloud provider or doesn't use any
            of the following: SSL, authentication certificates, or an SSH tunnel.
      
            a. Click :guilabel:`New Connection` and paste the connection
               string into the :guilabel:`Paste your connection string` field.
      
            #. (*Optional*) To save this connection for future use, click
               :guilabel:`Create Favorite` and add a name for this connection.
               You can find saved favorite connections under :guilabel:`Favorites`
               in the left pane of the |compass| :guilabel:`Connect` window.
      
            #. Click :guilabel:`Connect`.
      
         .. tab:: Fill in Connection Fields Individually
            :tabid: fill
      
            Fill in connection fields individually if your deployment spans
            more than one cloud provider or if it uses one of the following:
            SSL, authentication certificates, or an SSH tunnel.
      
            #. Click :guilabel:`Fill in Connection Fields Individually`.
      
            #. Under the :guilabel:`hostname` tab, enter the hostname and port,
               and choose your authentication mechanism from the dropdown.
               
            #. Under the :guilabel:`More options` tab, configure the following:
      
               - If your deployment uses SSL or an SSH tunnel, specify
                 SSL or SSH tunnel options.
               - If your deployment spans more than one cloud provider,
                 specify :manual:`read preference options </reference/connection-string#read-preference-options>`.
               - If your deployment uses X.509 certificates, add a
                 :ref:`self-managed X.509 certificate <self-managed-x509>`
                 or an :manual:`auto-generated X.509 certificate </core/security-x.509/>`
                 managed by |service|.
      
               To learn more, see :compass:`Connect to MongoDB </connect/>`
               in the |compass| documentation.
      
            #. (*Optional*) To save this connection for future use, click
               :guilabel:`Create Favorite` and add a name for this connection.
               You can find saved favorite connections under :guilabel:`Favorites`
               in the left pane of the |compass| :guilabel:`Connect` window.
      
            #. Click :guilabel:`Connect`.
