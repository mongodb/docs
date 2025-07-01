.. list-table::
   :header-rows: 1
   :widths: 25 25 75

   * - Name
     - Type
     - Description

   * - ``cidrBlock``
     - string
     - CIDR-notated range of IP addresses in the access list.

   * - ``count``
     - number
     - Total number of requests that have originated from this IP
       address.

   * - ``created``
     - date
     - Date this IP address was added to the access list.

   * - ``ipAddress``
     - string
     - IP address in the access list.

   * - ``lastUsed``
     - date
     - Date of the most recent request that originated from this IP
       address. This field only appears if at least one request has
       originated from this IP address, and is only updated when a
       resource is retrieved from the access list.

   * - ``lastUsedAddress``
     - string
     - IP address from which the last call to the API was issued. This
       field only appears if at least one request has originated
       from this IP address.

   * - ``links``
     - array
     - An array of documents, representing a :ref:`link <api-linking>`
       to one or more sub-resources and/or related resources such as
       :ref:`list pagination <api-lists>`. See :ref:`api-linking` for
       more information.
