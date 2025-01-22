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

   .. step:: Rotate the LDAP Authorization Passwords. (Optional)
      
      .. important::
      
         You can authenticate users using LDAP, Kerberos, or X.509 certificates
         without requiring local user documents in the ``$external`` database
         as long as you enable LDAP authorization first. When such a user successfully
         authenticates, MongoDB performs a query against the LDAP server to
         retrieve all groups which that LDAP user possesses and transforms those
         groups into their equivalent MongoDB roles.

         Ensure you selected :guilabel:`Native LDAP Authentication`,
         and then complete the following steps:
      
      a. Provide the following values:
      
         .. list-table::
            :header-rows: 1
            :widths: 30 70
      
            * - Setting
      
              - Value
      
            * - Server URL
      
              - Specify the ``hostname:port`` combination of one or more LDAP servers.
      
            * - Transport Security 
      
              - Select ``TLS`` to encrypt your LDAP queries. If you do not
                need to encrypt the LDAP queries, select ``None``.
      
            * - Timeout (ms)  
      
              - Specify how long an authentication request should wait before timing out.
      
            * - Bind Method  
      
              - Select either ``SASL`` or ``Simple``. 
      
                :gold:`IMPORTANT:` If you choose the ``Simple`` bind
                method, select ``TLS`` from the 
                :guilabel:`Transport Security` because the
                ``Simple`` bind method passes the password in plain
                text.
      
            * - SASL Mechanisms  
      
              - Specify which SASL authentication service MongoDB uses with 
                the LDAP server.
      
            * - Query User (LDAP Bind DN)
      
              - Specify the LDAP Distinguished Name to which MongoDB binds when 
                connecting to the LDAP server.
      
            * - Query Password (LDAP Bind DN)
      
              - Specify the password with which MongoDB binds when connecting to an 
                LDAP server.

            * - New Query Password (LDAP Bind DN)
      
              - Specify the new password with which MongoDB will bind when
                connecting to an LDAP server. Specifying a new password in
                this field allows you to smoothly rotate the query password.

                .. important::

                   After you rotate the password on the LDAP server side,
                   move the contents of the :guilabel:`New Query Password`
                   field into the :guilabel:`Query Password` field and make
                   the :guilabel:`New Query Password` field empty.

            * - LDAP User Cache Invalidation Interval (s)  

              - Specify how long MongoDB waits to flush the LDAP user cache.
                Defaults to ``30`` seconds.

            * - User to Distinguished Name Mapping

              - Specify an array of JSON documents that provide the ordered
                transformation(s) MongoDB performs on the authenticated MongoDB
                usernames. MongoDB then matches the transformed username 
                against the LDAP DNs.

            * - Validate LDAP Server Config

              - Select ``ON`` to validate the LDAP server configuration
                or ``OFF`` to skip validation.

                If ``ON`` and the configuration is invalid, the MongoDB
                deployment will not start.

      #. In the :guilabel:`LDAP Authorization` section, enter values for the
         following fields:

         .. list-table::
            :header-rows: 1
            :widths: 30 70

            * - Setting
      
              - Value
      
            * - :guilabel:`LDAP Authorization`
      
              - Toggle to :guilabel:`ON` to enable LDAP authorization.
      
            * - :guilabel:`Authorization Query Template`
      
              - Specify a template for an LDAP
                query URL to retrieve a list of LDAP groups for an LDAP 
                user.
      
            * - :guilabel:`User to Distinguished Name Mapping`
      
              - Specify an array of JSON documents that provide the ordered
                transformation(s) MongoDB performs on the authenticated MongoDB
                usernames. MongoDB then matches the transformed username 
                against the LDAP DNs.
      
   .. step:: Configure the Agents to use {{mechanism}} to connect to your MongoDB deployment.
      
      .. note:: Remember
         
         |mms| limits Agents to using one :term:`mechanism <authentication
         mechanism>` per deployment.
      
      a. Select the {{mechanism}} option from the :guilabel:`Agent Auth Mechanism` 
         section.
      
      b. Provide credentials for the {+mdbagent+}:
      
         .. list-table::
            :header-rows: 1
            :widths: 30 70
      
            * - Setting
              - Value
      
            * - :guilabel:`MongoDB Agent Username`
              - Enter the |ldap| username.
      
            * - :guilabel:`MongoDB Agent Password`
              - Enter the password for Agent's |ldap| Username.
      
            * - MongoDB Agent LDAP Group DN
              - If you enabled LDAP Authorization, enter the |dn| of the
                group of which the MongoDB Agent user is a member.

   .. step:: Click :guilabel:`Save Settings`.

      .. note:: 

         While you save the settings with a new password, MongoDB tries
         both passwords. After completing this procedure, you can change
         the password in your LDAP server. After you rotate the password
         on the LDAP server side, move the contents of the
         :guilabel:`New Query Password` field into the :guilabel:`Query Password`
         field and make the :guilabel:`New Query Password` field empty.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.

      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.

   .. step:: Create MongoDB Roles for LDAP Groups. (Optional)

      After enabling LDAP Authorization, you need to 
      :doc:`create custom MongoDB roles </tutorial/manage-mongodb-roles>` 
      for each LDAP Group you specified for LDAP Authorization. 
