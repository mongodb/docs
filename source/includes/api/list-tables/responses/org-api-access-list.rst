.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - cidrBlock
     - string
     - |cidr|\-notated range of permitted IP addresses.

   * - count
     - integer
     - Total number of requests that have originated from this IP
       address.

   * - created
     - string
     - |iso8601-time| when this IP address was added to the |api|
       access list.

   * - ipAddress
     - string
     - IP address in the |api| access list.

   * - lastUsed
     - string
     - |iso8601-time| when the most recent request that originated
       from this IP address. This parameter only appears if at least
       one request has originated from this IP address, and is only
       updated when a permitted resource is accessed.

   * - lastUsedAddress
     - string
     - IP address from which the last call to the |api| was issued.
       This parameter only appears if at least one request has
       originated from this IP address.

   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst
