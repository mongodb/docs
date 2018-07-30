.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``cidrBlock``
     - string
     - The whitelist entry in Classless Inter-Domain Routing (CIDR)
       notation.

   * - ``ipAddress``
     - string
     - The whitelisted IP address. Only present for entries
       not created using :abbr:`CIDR (Classless Inter-Domain Routing)`
       notation.

   * - ``groupId``
     - string
     - ID of the project containing the whitelist entry.

   * - ``comment``
     - string
     - The comment associated with the whitelist entry.

   * - ``deleteAfterDate``
     - date
     - The `ISO-8601 <https://en.wikipedia.org/wiki/ISO_8601>`_-
       formatted date after which |service| deletes the temporary
       whitelist entry. This field is only present for if an
       expiration date was specified when creating the entry.

   * - ``links``
     - object array
     - This array includes a :ref:`link <api-linking>`
       to the whitelist entry, including the HTML-escaped IP or
       :abbr:`CIDR (Classless Inter-Domain Routing)` address.
