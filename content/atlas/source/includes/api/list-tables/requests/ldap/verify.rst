.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - authzQueryTemplate
     - string
     - Optional
     - |ldap| query template that |service| executes to obtain the
       |ldap| groups to which the authenticated user belongs. This
       parameter applies only for user authorization. Use the
       **{USER}** placeholder in the |url| to substitute the
       authenticated username. The query executes on a path relative to
       the host specified with **hostname**. The formatting for the
       query must conform to :rfc:`RFC 4515 <4515>` and :rfc:`RFC 4516
       <4516>`. This parameter uses the default value of
       **{USER}?memberOf?base**.

   * - bindUsername
     - string
     - Required
     - User DN that |service| uses to connect to the |ldap| server.
       Write in the format of a full DN:

       .. code-block:: text

          CN=BindUser,CN=Users,DC=my|ldapserver|,DC=mycompany,DC=com

   * - bindPassword
     - string
     - Required
     - Password used to authenticate the **bindUsername**.

   * - caCertificate
     - string
     - Optional
     - |certauth| certificate used to verify the identify of the |ldap|
       server. You may use self-signed certificates.

   * - hostname
     - string
     - Required
     - |fqdn| or IP address of the host that serves the |ldap|
       directory. This host must be visible to the internet or
       connected to your |service| cluster with :doc:`VPC Peering
       </security-vpc-peering>`.

   * - port
     - integer
     - Required
     - Port to which the |ldap| server listens for client connections.
       This parameter use a default value of **636**.
