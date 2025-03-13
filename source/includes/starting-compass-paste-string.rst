.. procedure:: 
   :style: normal 

   .. step:: Open the :guilabel:`New Connection` modal.

      .. include:: /includes/open-new-connection.rst
   
   .. step:: Paste your connection string. 

      If you have the connection string for your deployment available, you can 
      paste the string directly into the dialog box. You can use either the 
      :manual:`Standard Connection String Format 
      </reference/connection-string/#connections-standard-connection-string-format>`
      or the :manual:`DNS Seedlist Connection Format 
      </reference/connection-string/#connections-dns-seedlist>`. 
      
      To obtain the connection string for an |service| cluster: 
      
      a. Navigate to your |service| :guilabel:`Clusters` view.
            
      #. Click :guilabel:`Connect` for your desired cluster.
            
      #. Click :guilabel:`Connect with MongoDB Compass`.
            
      #. Copy the provided connection string.

      .. include:: /includes/fact-hide-connection-string-password.rst
            
      To learn how to format the connection string for a deployment that is not 
      hosted on |service|, see :manual:`Connection String URI Format
      </reference/connection-string>`.
      
   .. step:: (Optional). Name your connection.

      Use the name field to enter a name for your connection. If you do
      not specify a name, Compass uses the cluster's hostname as the
      connection name. 

   .. step:: (Optional). Choose a color for your connection.

      Use the color drop-down menu to select a label color for your
      connection. When you connect to a connection, the label color is
      the background color of tabs that reference your connection.

   .. step:: (Optional). Favorite your connection. 

      If you want to save the connection as a favorite, check the
      :guilabel:`Favorite this connection` option in the modal.

   .. step:: Connect to your cluster.

      To navigate to the |compass-short| :ref:`Home Page <compass-home-screen>`,
      click :guilabel:`Save`, :guilabel:`Connect`, or :guilabel:`Save & Connect`.
      
      - The :guilabel:`Save` button saves your connection and closes the modal without
        yet connecting to your cluster. 
      - The :guilabel:`Connect` button allows you to 
        connect to your cluster without saving your connection string or credentials. 
      - The default :guilabel:`Save & Connect` button both saves your information and connects
        you to your cluster. 

      .. important:: Required Access
        
        Once you are connected to your MongoDB deployment, you may require 
        specific :manual:`user roles <reference/built-in-roles/>` to access 
        various |compass-short| features. For more information on the required 
        roles for |compass-short| features, see :ref:`required-access`.
