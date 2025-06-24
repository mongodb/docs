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
      
   .. step:: Choose the authentication mechanism.

      In the :guilabel:`MongoDB Deployment Authentication Mechanism`
      section, select {{mechanism}} or {{mechanism2}}.
      
   .. step:: Configure {{mechanism}} or {{mechanism2}} for the Agent.
      
      You can enable more than one authentication mechanism for your MongoDB
      deployment, but the |mms| Agents can only use *one* authentication
      mechanism.
      
      In the :guilabel:`MongoDB Agent Connections to Deployment` section,
      select {{mechanism}} and/or {{mechanism2}}.
      
      |mms| automatically generates the Agents' usernames and passwords.
      
      |mms| creates users for the agents with the required user roles in
      the admin database for each existing deployment in |mms|. When you
      add a new deployment, |mms| creates the required users in the new
      deployment.
      
   .. step:: Click :guilabel:`Save Settings`.
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      