.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-security.rst
      
   .. step:: Go to the :guilabel:`Security Settings` dialog for your deployment.

      Do one of the following actions:
  
      - If this is your first time configuring |tls|,
        authentication, or authorization settings for this project, 
        click :guilabel:`Get Started`.

      - If you have already configured |tls| authentication, or
        authorization settings for this project, click :guilabel:`Edit`.
      
   .. step:: Choose your Authentication Mechanisms.
      
      a. On the :guilabel:`Select Authentication Mechanisms` screen,
         :doc:`enable one or more Authentication Mechanisms </tutorial/edit-host-authentication-credentials>`.
      
         |tls| works with all authentication mechanisms.
      
      b. Click :guilabel:`Next`.
      
   .. step:: Specify the |tls| Settings.
      
      .. list-table::
         :widths: 30 70
         :header-rows: 1
         :stub-columns: 1
      
         * - Field
           - Action
      
         * - MongoDB Deployment Transport Layer Security (TLS)
           - Toggle this slider to :guilabel:`ON`.
      
         * - TLS CA File Path
           - The |tls| |certauth| file is a ``.pem``-format certificate
             file that contains the root certificate chain from the
             |certauth|. The {+mdbagent+} uses this same |certauth| file
             to connect to every item in your deployment.
      
             .. include:: /includes/fact-PKCS8-not-supported.rst
      
             Type the file path to the |tls| |certauth| file on every host
             running a MongoDB process:
      
             - Type the file path on all Linux hosts in the first box.
      
             - Type the file path on all Windows hosts in the second box.
      
             This enables the :setting:`net.tls.CAFile` setting for the
             MongoDB processes in the project.
      
             Click :guilabel:`Validate` to test that each host in your
             deployment has a |tls| |certauth| at the paths you specified.
      
         * - Client Certificate Mode
           - Select if client applications or {+mdbagent+}\s must present a
             |tls| certificate when connecting to a |tls|\-enabled MongoDB
             deployments. Each MongoDB deployment checks for certificates
             from these client hosts when they try to connect. If you
             choose to require the client |tls| certificates, make sure
             they are valid.
      
             Accepted values are:
      
             .. list-table::
                :widths: 25 75
                :stub-columns: 1
      
                * - Optional
                  - Every client may present a valid |tls| certificate when
                    connecting to MongoDB deployments. {+mdbagent+}\s might
                    use |tls| certificates if you *don't* set the |mongod|
                    :parameter:`tlsMode` to ``None``.
      
                * - Required
                  - Every MongoDB deployment in this project starts with
                    |tls|\-encrypted network connections. All Agents
                    must use |tls| to connect to any MongoDB
                    deployment.
      
   .. step:: Configure the {+mdbagent+}s.
      
      a. In the :guilabel:`Agent Auth Mechanism` list, click the same
         authentication mechanisms that you did for the project.
      
      b. Follow the procedure to configure the {+mdbagent+} to use that
         authentication method:
      
         - :doc:`SCRAM-SHA </tutorial/configure-mongodb-agent-for-scram>`
         - :doc:`X.509 Certificates </tutorial/configure-mongodb-agent-for-x509>`
         - :doc:`LDAP </tutorial/configure-mongodb-agent-for-ldap>`
         - :doc:`Kerberos </tutorial/configure-mongodb-agent-for-kerberos>`
      
      .. note::
      
         If you had |tls| certificates for Legacy Agents, see
         **What if I had TLS certificates for Legacy Backup or Monitoring
         Agents?** at the end of this procedure for guidance.
      
   .. step:: Click :guilabel:`Save` to set your changes.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
      
      |mms| displays your proposed changes.
      
      a. If you are satisfied, click :guilabel:`Confirm & Deploy`.
      b. If you want to make further configuration changes, 
         click :guilabel:`Cancel`. Click :guilabel:`Modify` for the
         cluster to make additional changes.    
