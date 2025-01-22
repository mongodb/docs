.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-backup-page.rst

   .. step:: Download the encrypted snapshot.
      
      a. If it isn't already selected, click the :guilabel:`Snapshots` 
         tab.
      
      #. In the :guilabel:`Actions` column, expand the 
         :icon-fa5:`ellipsis-v` :guilabel:`Actions`
         menu, and click :guilabel:`Download` for the snapshot that you 
         want to download.
      
         |service| prepares the snapshot. When it is ready to download,
         |service| generates a one-time use download link that expires
         1 hour after its creation. |service| emails you the download link and displays it
         in the :guilabel:`Restores & Downloads` tab.
      
   .. step:: Download the KMIP Proxy Standalone.
      
      In the :guilabel:`Preparing Snapshot Download` modal, click 
      :guilabel:`Download KMIP Proxy` and select the binary for your
      operating system.
      
      .. tip::
         
         You can also do one of the following steps to access the
         :guilabel:`download KMIP Proxy Standalone` link:

         - Click the :guilabel:`Restores & Downloads` tab.

         - .. include:: /includes/nav/list-advanced.rst
           
           The link appears in the 
           :guilabel:`Encryption at Rest using your Key Management` 
           section.
      
   .. step:: Start the |kmip| Proxy Standalone.
      
      a. Open a terminal or command prompt window.
      
      #. Invoke the following command with the specified parameters:
      
         .. tabs::
      
            .. tab:: AWS
               :tabid: aws
      
               .. code-block:: sh
      
                  kmipProxyStandalone 
                    -awsAccessKey <accessKey> -awsSecretAccessKey <secretAccessKey> \ 
                    -awsSessionToken <token> -awsRegion <region> -cloudProvider aws \
                    -dbpath <dbpath> -kmipPort <kmipPort> -mongodPort <mongodPort>  
      
               .. list-table::
                  :widths: 30 70
                  :header-rows: 1
      
                  * - Parameter
                    - Description
      
                  * - ``awsAccessKey``
                    - |iam| access key ID with permissions to access the customer
                      master key.
      
                      Required only if you didn't specify an ``accessKeyId``
                      in the
                      ``/<dbPath>/cloudProviderCredentials/<keyID>.<cloudProvider>.metadata``
                      file.
      
                  * - ``awsSecretAccessKey``
                    - |iam| secret access key with permissions to access the 
                      customer master key.
      
                      Required only if you didn't specify a ``secretAccessKey``
                      in the
                      ``/<dbPath>/cloudProviderCredentials/<keyID>.<cloudProvider>.metadata``
                      file.
      
                  * - ``awsSessionToken``
                    - Token to use when granting temporary |aws| security credentials.
      
                  * - ``awsRegion``
                    - |aws| region in which the |aws| customer master key
                      exists.
      
                      Required only if you didn't specify a ``region``
                      in the
                      ``/<dbPath>/cloudProviderCredentials/<keyID>.<cloudProvider>.metadata``
                      file.
          
                  * - ``cloudProvider``
                    - Your cloud service provider. 
                      Value must be ``aws``.
           
                  * - ``dbpath``
                    - Path to the ``mongod`` data directory for which you want to 
                      create a proxy. 
          
                  * - ``kmipPort``
                    - Port on which to run the |kmip| proxy.
      
                  * - ``mongodPort``
                    - Port on which to run the ``mongod``.
      
            .. tab:: Azure and GCP
               :tabid: other
      
               .. code-block:: sh
      
                  kmipProxyStandalone 
                    -cloudProvider <azure|gcp> -dbpath <dbpath> \ 
                    -kmipPort <kmipPort> -mongodPort <mongodPort>  
      
               .. list-table::
                  :widths: 30 70
                  :header-rows: 1
      
                  * - Parameter
                    - Description
          
                  * - ``cloudProvider``
                    - Your cloud service provider. 
                      Valid values are ``azure`` or ``gcp``.
           
                  * - ``dbpath``
                    - Path to the ``mongod`` data directory for which you want to 
                      create a proxy. 
          
                  * - ``kmipPort``
                    - Port on which to run the |kmip| proxy.
      
                  * - ``mongodPort``
                    - Port on which to run the ``mongod``.
      
      The |kmip| Proxy Standalone generates a |kmip| certificate for
      ``localhost`` and writes it to the ``dbpath``.
      
   .. step:: Start a ``mongod`` process.
      
      Invoke the following command with the specified parameters:
      
      .. code-block:: sh
      
         mongod --dbpath <dbpath> --port  <mongodPort> --enableEncryption --kmipPort <kmipPort> --kmipServerName 127.0.0.1 --kmipServerCAFile <dbpath>/kmipCA.pem --kmipActivateKeys false --kmipClientCertificateFile <dbpath>/kmipClient.pem
      
      .. list-table::
         :widths: 30 70
         :header-rows: 1
      
         * - Parameter
           - Description
           
         * - ``dbpath``
           - Path to the directory where the ``mongod`` stores its  
             data.
           
         * - ``port``
           - Port on which the ``mongod`` listens for client connections.
          
         * - ``kmipPort``
           - Port on which the |kmip| server listens.
      
         * - ``kmipServerCAFile``
           - Path to the CA File used to validate secure client connection
             to the |kmip| server.
      
         * - ``kmipActivateKeys``
           - For MongoDB server v5.2 or later, flag that specifies whether 
             to activate or disable keys for the MongoDB server. Value for 
             this parameter must be ``false`` when you start the MongoDB 
             server.
         
         * - ``kmipClientCertificateFile``
           - Path to the client certificate used for authenticating MongoDB
             to the |kmip| server.
         
      The ``mongod`` acts as a |kmip| server bound to ``127.0.0.1`` and
      runs on the specified ``kmipPort``.
      
   .. step:: Connect to the ``mongod`` process.
      
      Access your data files by connecting to the ``mongod`` through the
      {+mongosh+}, :compass:`MongoDB Compass`, or through standard 
      utilities such as :ref:`mongodump <command-line-tools-mongodump>` 
      or :ref:`mongorestore <command-line-tools-mongorestore>`.
