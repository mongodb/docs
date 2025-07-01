.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ldap
     - object
     - List of settings that configures |ldap| over |tls| for one
       |service| project.

   * - ldap.authenticationEnabled
     - boolean
     - Flag that indicates whether this projects can use user
       authentication with |ldap|.

   * - ldap.authorizationEnabled
     - boolean
     - Flag that indicates whether this project has enabled user
       authorization with |ldap|. Enable user authentication with
       |ldap| then enable user authorization with |ldap|.

   * - ldap.authzQueryTemplate
     - string
     - |ldap| query template that |service| executes to obtain the
       |ldap| groups to which the authenticated user belongs. This
       parameter applies only for user authorization. Use the
       **{USER}** placeholder in the |url| to substitute the
       authenticated username. The query executes on a path relative to
       the host specified with **hostname**. The formatting for the
       query must conform to :rfc:`RFC 4515 <4515>` and :rfc:`RFC 4516
       <4516>`. This parameter uses the default value of
       **{USER}?memberOf?base**.

   * - ldap.bindUsername
     - string
     - User DN that |service| uses to connect to the |ldap| server.
       Write in the format of a full DN:

       .. code-block:: text

          CN=BindUser,CN=Users,DC=my|ldapserver|,DC=mycompany,DC=com

   * - ldap.hostname
     - string
     - |fqdn| or IP address of the host that serves the |ldap|
       directory. This host must be visible to the internet or
       connected to your |service| cluster with :doc:`VPC Peering
       </security-vpc-peering>`.

   * - ldap.port
     - integer
     - Port on which the |ldap| server listens for client connections.
