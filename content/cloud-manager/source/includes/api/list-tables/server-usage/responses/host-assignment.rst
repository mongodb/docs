.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Response Element
     - Type
     - Description

   * - hosts
     - array of strings
     - List of virtual hosts bound to the provided physical host.

   * - | hosts
       | .groupId
     - string
     - Unique identifier of the project into which |onprem| places this
       virtual host.

   * - | hosts
       | .hostname
     - string
     - |fqdn| of the virtual host bound to the physical host.

   * - processes
     - array of objects
     - MongoDB processes running on the virtual host.

   * - | processes
       | .[n].cluster
     - object
     - Name of the cluster to which the MongoDB process belongs.

   * - | processes
       | .[n].groupName
     - string
     - Name of the project to which the MongoDB process belongs.

   * - | processes
       | .[n].orgName
     - string
     - Name of the organization to which the MongoDB process belongs.

   * - | processes
       | .[n].groupId
     - string
     - Unique identifier of the project to which the MongoDB process
       belongs.

   * - | processes
       | .[n].hasConflictingServerType
     - Boolean
     - Flag that indicates whether the node has a different server type
       than the other nodes.

   * - | processes
       | .[n].name
     - string
     - Name of the node hosting the MongoDB process.

   * - | processes
       | .[n].processType
     - integer
     - Number representing the type of MongoDB process.


   * - serverType
     - object
     - Server Type of the physical host.

       .. seealso::

          :ref:`admin-console-general-mongodb-usage`

   * - serverType.name
     - string
     - |mms| returns one of the following values:

       - ``DEV_SERVER``
       - ``TEST_SERVER``
       - ``PRODUCTION_SERVER``
       - ``RAM_POOL``

   * - serverType.label
     - string
     - |mms| returns one of the following values:

       - ``Dev Server``
       - ``Test Server``
       - ``Production Server``
       - ``Ram Pool``
