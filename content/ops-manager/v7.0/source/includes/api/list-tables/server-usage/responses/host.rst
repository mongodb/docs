.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Response Element
     - Type
     - Description

   * - hosts
     - array of objects
     - List of virtual hosts bound to the provided physical host.

   * - | hosts
       | .[n].groupId
     - string
     - Unique identifier of the project into which |onprem| places this
       virtual host.

   * - | hosts
       | .[n].hostname
     - string
     - |fqdn| of the virtual host bound to the physical host.

   * - id
     - string
     - Unique identifier of the physical host to which |onprem| bound
       the virtual hosts.

   * - name
     - string
     - Label you gave to the physical host.

   * - serverType
     - string
     - Server Type of the physical host.

       |mms| returns one of the following values:

       - DEV_SERVER
       - TEST_SERVER
       - PRODUCTION_SERVER
       - RAM_POOL

       To learn more, see :ref:`admin-console-general-mongodb-usage`.
