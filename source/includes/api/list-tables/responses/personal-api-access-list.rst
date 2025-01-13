.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - cidrBlock
     - string
     - |cidr|\-notated range of IP addresses.

   * - created
     - string
     - |iso8601-time| when this IP address was added to the access list.

   * - ipAddress
     - string
     - Access Listed IP address.

   * - lastUsed
     - string
     - |iso8601-time| when the most recent request that originated from
       this IP address.

       .. note::

          |service| updates this parameter when it accesses an |api|
          resource that the access list protects.

   * - lastUsedAddress
     - string
     - Last call to the API was issued from this address.

   * - count
     - integer
     - Total number of requests that originated from this IP
       address.

       .. note::

          |service| updates this parameter when it accesses an |api|
          resource that the access list protects.
