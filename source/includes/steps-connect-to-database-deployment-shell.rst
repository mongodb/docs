.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.
      
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
      
            - For |gcp| or |azure| and are connecting with {{connChoice}}
              from a peered network, or
            - For |aws| and are connecting with {{connChoice}} from a
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
            endpoint if you are connecting with {{connChoice}} over a
            Private Endpoint connection either because {{connChoice}}:
      
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
      
   .. step:: Connect to your |service| {+database-deployment+} with {+mongosh+}.
      
      Select :guilabel:`Shell`.
      
      The next screen offers you options to proceed based on whether or
      not you already have {+mongosh+}
      installed on your system.
      
      .. tabs::
      
         tabs:
      
           - id: download_shell
             name: I do not have the MongoDB Shell installed
      
             content: |
      
               Select your OS from the dropdown menu.
      
               .. tabs::
      
                  tabs:
      
                    - id: windows
                      name: Windows
                      content: |
      
                        1. Download using one of the following options:
      
                           - Click :guilabel:`Download mongosh` to
                             begin the download.
      
                           - Click :guilabel:`Copy download URL` to copy a
                             download |url| to your clipboard, then either:
      
                             -  Use ``curl`` to fetch the installer file 
                                from the |url|, or
      
                             -  Paste the |url| in a browser window.
      
                           .. include:: /includes/facts/download-center-link.rst
      
                        #. Extract the files from the downloaded archive.
      
                        #. Add the {+mongosh+} binary to your ``PATH`` 
                           environment variable.
      
                           Ensure that the extracted MongoDB Shell binary 
                           is in the desired location in your filesystem, 
                           then add that location to your ``PATH``
                           environment variable.
      
                           a. Open the :guilabel:`Control Panel`.
      
                           #. In the :guilabel:`System and Security` 
                              category, click :guilabel:`System`.
      
                           #. Click :guilabel:`Advanced system settings`. 
                              The :guilabel:`System Properties` modal 
                              displays.
      
                           #. Click :guilabel:`Environment Variables`.
      
                           #. Select :guilabel:`Path` and click
                              :guilabel:`Edit`.
      
                           #. Click :guilabel:`New` and add the filepath to 
                              your {+mongosh+} binary.
                             
                           #. *Step 3* of the |service| modal displays a
                              copyable connection string. This string
                              includes the name of the MongoDB user that can
                              authenticate with the {+database-deployment+}. Copy this
                              string. To connect as a different MongoDB user,
                              change the
                              :mongosh:`--username </reference/options/#std-option-mongosh.--username>` option.
               
                           #. Paste the {+mongosh+} command and connection string
                              into a terminal. Run the command. The shell
                              prompts you for the
                              :mongosh:`password </reference/options/#std-option-mongosh.--password>`.
      
                           .. include:: /includes/connect-to-database-deployment-shell-stdin-note.rst  
      
                    - id: macos
                      name: macOS
                      content: |
      
                        1. Use the Homebrew command provided.
      
                        #. Copy the Homebrew command from the {+atlas-ui+}
                           window and run it in a terminal.
      
                        #. *Step 3* of the |service| modal displays a
                           copyable connection string. This string
                           includes the name of the MongoDB user that can
                           authenticate with the {+database-deployment+}. Copy this
                           string. To connect as a different MongoDB user,
                           change the
                           :mongosh:`--username </reference/options/#std-option-mongosh.--username>` option.
      
                        #. Paste the {+mongosh+} command and connection string
                           into a terminal. Run the command. The shell
                           prompts you for the
                           :mongosh:`password </reference/options/#std-option-mongosh.--password>`.
      
                        .. include:: /includes/connect-to-database-deployment-shell-stdin-note.rst
      
                    - id: linux
                      name: Linux
                      content: |
      
                        1. Download the installer using one of the
                           following options:
      
                           - Click :guilabel:`Download mongosh` to
                             begin the download.
      
                           - Click :guilabel:`Copy download URL` to copy a
                             download |url| to your clipboard, then either:
      
                             -  Use ``curl`` to fetch the installer file 
                                from the |url|, or
      
                             -  Paste the |url| in a browser window.
      
                           .. include:: /includes/facts/download-center-link.rst
      
                           .. note::
      
                              The type of file you download depends on the
                              operating system you selected. If you select 
                              a version of:
      
                              - **Ubuntu or Debian** you receive a ``.deb``
                                package.
                              - **RHEL, Amazon Linux, or SUSE** you receive
                                an ``.rpm`` package.
      
                              If your operating system isn't listed, see
                              the :mongosh:`.tgz installation instructions
                              </install>` in the {+mongosh+} documentation. 
      
                        #. Install the {+mongosh+} package.
      
                           .. include:: /includes/facts/tabs-install-mongosh.rst
      
                        #. *Step 3* of the |service| modal displays a
                           copyable connection string. This string
                           includes the name of the MongoDB user that can
                           authenticate with the {+database-deployment+}. Copy this
                           string. To connect as a different MongoDB user,
                           change the ``--username`` option.
      
      
                        #. Paste the {+mongosh+} command and connection string
                           into a terminal. Run the command. The shell
                           prompts you for the password.
      
                        .. include:: /includes/connect-to-database-deployment-shell-stdin-note.rst
      
           - id: connect_from_shell
             name: I have the MongoDB Shell installed
      
             content: |
      
               1. Select ``mongosh`` from the dropdown menu.
                  We recommend that you upgrade to the latest version
                  of the shell. To check the installed version of the
                  {+mongosh+}, run:
      
                  .. code-block:: sh
      
                     mongosh --version
      
               #. *Step 2* of the |service| modal displays a copyable
                  connection string that includes the name of the
                  MongoDB user that can authenticate with the {+database-deployment+}. Copy
                  this string. To connect as a different MongoDB user,
                  change the :mongosh:`--username </reference/options/#std-option-mongosh.--username>`
                  option.
      
               #. Paste the {+mongosh+} command and connection string into a
                  terminal. Run the command. The shell prompts you for the
                  :mongosh:`password </reference/options/#std-option-mongosh.--password>`.
      
               .. include:: /includes/connect-to-database-deployment-shell-stdin-note.rst     
