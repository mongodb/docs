.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field 
     - Description 

   * - ``groupId``
     - Unique identifier of the project. 

       .. note:

          Groups and projects are synonymous terms. Your {GROUP-ID} 
          is the same as your project ID.

   * - ``cidrBlock``
     - Whitelist entry in Classless Inter-Domain Routing (|cidr|) 
       notation. Mutually exclusive with ``awsSecurityGroup`` and
       ``ipAddress``.

   * - ``ipAddress``
     - Whitelisted IP address. Mutually exclusive with ``awsSecurityGroup`` and ``ciderBlock``.

   * - ``deleteAfter``
     - Date in |iso8601| format after which |service| deletes the
       whitelist entry. 

   * - ``awsSecurityGroup``
     - Whitelisted ID of an |aws| security group. Mutually exclusive with ``cidrBlock`` and ``ipAddress``.

   * - ``comment``
     - Description of the whitelist entry.
