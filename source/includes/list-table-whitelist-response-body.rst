.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``awsSecurityGroup``
     - string
     - ID of the whitelisted |aws| security group. Mutually exclusive
       with ``cidrBlock`` and ``ipAddress``.

   * - ``cidrBlock``
     - string
     - Whitelist entry in Classless Inter-Domain Routing (CIDR)
       notation. Mutually exclusive with ``awsSecurityGroup`` and
       ``ipAddress``.

   * - ``ipAddress``
     - string
     - Whitelisted IP address. Mutually exclusive with ``awsSecurityGroup`` and ``cidrBlock``.

   * - ``groupId``
     - string
     - ID of the project containing the whitelist entry.

   * - ``comment``
     - string
     - Comment associated with the whitelist entry.

   * - ``deleteAfterDate``
     - date
     - `ISO-8601 <https://en.wikipedia.org/wiki/ISO_8601>`_-
       formatted date after which |service| deletes the temporary
       whitelist entry. This field is only present if an
       expiration date was specified when creating the entry.

   * - ``links``
     - object array
     - Includes a :ref:`link <atlas-api-linking>`
       to the whitelist entry, including the HTML-escaped IP or
       :abbr:`CIDR (Classless Inter-Domain Routing)` address.
