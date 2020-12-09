.. list-table::
   :header-rows: 1
   :widths: 25 25 75

   * - Name
     - Type
     - Description

   * - ``cidrBlock``
     - string
     - CIDR-notated range of whitelisted IP addresses.

   * - ``count``
     - number
     - Total number of requests that have originated from this IP
       address.

   * - ``created``
     - date
     - Date this IP address was added to the whitelist.

   * - ``ipAddress``
     - string
     - Whitelisted IP address.

   * - ``lastUsed``
     - date
     - Date of the most recent request that originated from this IP
       address. This field only appears if at least one request has
       originated from this IP address, and is only updated when a
       whitelisted resource is accessed.

   * - ``lastUsedAddress``
     - string
     - IP address from which the last call to the API was issued. This
       field only appears if at least one request has originated
       from this IP address.

   * - ``links``
     - array
     - An array of documents, representing a :ref:`link <api-linking>`
       to one or more sub-resources and/or related resources such as
       :ref:`list pagination <atlas-api-lists>`. See :ref:`api-linking` for
       more information.
