.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Parameter
     - Type
     - Necessity
     - Description

   * - GROUP-ID
     - string
     - Required
     - Unique 24-hexadecimal digit string that identifies the project
       that owns this |service| MongoDB process.

   * - HOST
     - string
     - Required
     - Hostname, |fqdn|, |ipv4| address, or |ipv6| address of the
       machine running the |service| MongoDB process.

   * - PORT
     - number
     - Required
     - |iana| port to which the |service| MongoDB process listens.
