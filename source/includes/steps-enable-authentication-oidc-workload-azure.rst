.. procedure::
   :style: normal
      
   .. step:: Navigate to the :guilabel:`Security Settings` dialog for your deployment.

      a. Select the organization that
         contains your project from the |ui-org-menu| in the
         navigation bar.

      #. Select your project
         from the :guilabel:`Projects` menu in the navigation bar.

      #. Click :guilabel:`Deployment` in 
         the sidebar.
      #. Click the :guilabel:`Security` tab.
      #. Click the :guilabel:`Settings` tab.
      #. Perform one of the following actions:
      
         - If this is your first time configuring |tls|,
           authentication, or authorization settings for this project, click
           :guilabel:`Get Started`.
         - If you have already configured |tls| authentication, or
           authorization settings for this project, click :guilabel:`Edit`.

   .. step:: Optional: Specify the |tls| Settings.
      
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
      
         * - Cluster TLS CA File Path
           - The :file:`.pem` file that contains the root certificate chain from the Certificate Authority
             used to validate the certificate presented by a client establishing a connection.
             Specify the file name of the :file:`.pem` file using relative or absolute paths.
             :setting:`net.tls.clusterCAFile` requires that :setting:`net.tls.CAFile` is set.
      
             If you do not specify the :setting:`net.tls.clusterCAFile`, the cluster uses the :file:`.pem` file specified in the
             :setting:`net.tls.CAFile` option.
      
             :setting:`net.tls.clusterCAFile` lets you use separate Certificate
             Authorities to verify the client-to-server and server-to-client
             portions of the TLS handshake.
      
         * - Client Certificate Mode
           - Select if client applications or {+mdbagent+}\s must present a
             |tls| certificate when connecting to |tls|\-enabled MongoDB
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

      In the :guilabel:`MongoDB Deployment Authentication Mechanism` section,
      select :guilabel:`Federated Auth (OIDC)`.

   .. step:: Create a new |oidc| |idp| configuration.
     
      a. In the :guilabel:`OIDC Connection and Authorization (Required for OIDC)` section, 
         click :guilabel:`+ OIDC IdP Configuration`.
        
      #. In the :guilabel:`OIDC Protocol Settings` dialog box, select
         :guilabel:`Workload Identity Federation`.

   .. step:: Enter the following settings.
      
      .. list-table::
         :header-rows: 1
         :widths: 30 20 50
         :stub-columns: 1

         * - Setting
           - Necessity
           - Value

         * - :guilabel:`Configuration Name`
           - Required
           - Unique label that identifies this configuration. This label
             is visible to your |mms| users and is used
             when :ref:`creating users and roles <cm-create-oidc-user-workload>`
             for authorization. It is case-sensitive and can 
             only contain the following characters:

             - alphanumeric characters 
               (combination of ``a`` to ``z`` and ``0`` to ``9``)
             - hyphens (``-``)
             - underscores (``_``)

             .. note::

                After saving the configuration, 
                you can't edit the configuration name.

         * - :guilabel:`Issuer URI`
           - Required
           - Issuer value provided by your registered |idp| application.
             Using this URI, MongoDB finds an OpenID Provider Configuration
             Document, which should be available in the
             ``/.wellknown/open-id-configuration`` endpoint.

         * - :guilabel:`Audience`
           - Required
           - Entity that your external identity provider intends the token for. Enter
             the ``audience`` value from the app you registered
             with external |idp-full|.

         * - Authorization Type
           - Required
           - Select ``Group Membership`` to grant authorization based on |idp| 
             user group membership, or select ``User ID`` to grant an individual 
             user authorization.

             It is more common to use ``User ID`` for application access. 

         * - :guilabel:`Customize User Claim`
           - Required
           - The identifier of the claim that includes the user principal
             identity. Accept the default value unless your |idp| uses a
             different claim.
              
             *Default*: ``sub``

         * - :guilabel:`Customize Group Claim`
           - Required
           - Required if you select ``Group Membership`` as the authorization type. 
             The identifier of the claim that includes the principal's |idp|
             user group membership information. Accept the default value
             unless your |idp| uses a different claim, or you need a custom 
             claim. 
      
             *Default*: ``groups``
      
   .. step:: Click :guilabel:`Save Configuration`.
      
      |mms| saves the configuration and lists it
      in the :guilabel:`OIDC Connection and Authorization
      (Required for OIDC)` section.
     
   .. step:: Click :guilabel:`Save Settings`.
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      
