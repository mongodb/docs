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
      
   .. step:: Configure the OIDC Authorization Settings.
      
      Provide the following values:
      
      .. list-table::
         :header-rows: 1
         :widths: 30 25 45
         :stub-columns: 1
      
         * - Setting
           - Necessity
           - Value
      
         * - :guilabel:`Audience`
           - Required
           - Specify who your OIDC provider intends the token for.
      
         * - :guilabel:`Issuer URI`
           - Required
           - Issuer value provided by your registered |idp| application.
             Using this URI, MongoDB finds an OpenID Provider Configuration
             Document, which should be available in the
             ``/.wellknown/open-id-configuration`` endpoint.
      
         * - :guilabel:`Client ID`
           - Required
           - Unique identifier for your registered application. Enter
             the ``clientId`` value from the app you registered
             with |oidc| |idp|.
      
         * - :guilabel:`Requested Scopes`
           - Optional
           - Tokens that give users permission to request data
             from the authorization endpoint.
      
             For each additional scope you want to add, click :guilabel:`Add
             more scopes`.
      
         * - :guilabel:`User Claim`
           - Optional
           - The identifier of the claim that includes the user principal
             identity. Accept the default value unless your |idp| uses a
             different claim.
              
             *Default*: ``sub``
      
         * - :guilabel:`Groups Claim`
           - Optional
           - The identifier of the claim that includes the principal's |idp|
             user group membership information. Accept the default value
             unless your |idp| uses a different claim, or you need a custom 
             claim. 
      
             *Default*: ``groups``
      
   .. step:: Click :guilabel:`Save Settings`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.  
