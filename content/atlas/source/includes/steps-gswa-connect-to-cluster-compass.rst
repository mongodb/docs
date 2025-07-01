.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.

   .. include:: /includes/cluster-connection-options.rst

   .. step:: Click :guilabel:`Compass`.
      
      From the `Connect Modal 
      <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2Fconnect%3FclusterId%3D%3Ccluster%3E>`__, click :guilabel:`Compass`.

   .. step:: Get the Connection String for |compass| from |service|.
      
      a. Click :guilabel:`I have MongoDB Compass installed`.
      
      #. Choose your version of |compass| in the dropdown. To check
         the version of |compass| that you have installed on your system,
         click :guilabel:`About MongoDB Compass` in the application.
      
      #. Copy the connection string in the |service|
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
