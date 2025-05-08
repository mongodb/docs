.. step:: Choose your Connection Security.
      
      :guilabel:`Choose Connection Type` from the set of available buttons.
      
      .. note:: Options Display if Feature Enabled
      
         |service| displays the connection type options after you enable
         :doc:`Private IP for Peering </security-vpc-peering>`,
         :ref:`Private Endpoint <atlas-configure-private-endpoint>`, or
         both. If you haven't enabled either feature, no buttons display
         and **Connection Type** defaults to **Standard**.
      
      .. tabs::
      
         .. tab:: Standard Connection
            :tabid: standard
      
            Use this connection type for allowed public IP addresses.
      
         .. tab:: Private IP for Peering
            :tabid: peering
      
            Use this connection type if you enabled peering:
      
            - For |gcp| or |azure| and are connecting with your driver
              from a peered network, or
            - For |aws| and are connecting with your driver from a
              peered network which uses a custom |dns| service.
      
            If neither of these apply, add your IP address to your IP
            access list and use the Standard Connection string. If you are
            connecting directly to |service| from an office or home
            network, this might be the preferred option.
      
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
            endpoint if you are connecting with your driver over a
            Private Endpoint connection either because your driver:
      
            - Runs inside your cloud provider network, or
            - Has transitive network access to your cloud provider network.
            - You want to use an :ref:`optimized connection string
              <optimized-connection-strings>`.
      
            If none of these apply, add your IP address to your IP
            access list and use the Standard Connection string. If you are
            connecting directly to |service| from an office or home
            network, this might be the preferred option.
      
            .. note::
      
               You can't select this option unless your configured
               PrivateLink connection is ready to use. To learn how to
               check the status of your {+aws-pl+}, see :ref:`atlas-troubleshoot-private-endpoint`. 