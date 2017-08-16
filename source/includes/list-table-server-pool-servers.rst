.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - A unique identifier for the server.

   * - ``hostname``
     - string
     - The hostname that identifies the server.

   * - ``properties``
     - object of key/value pairs
     - The custom properties assigned to the server. Administrators control
       which properties to expose to end users. If properties are exposed,
       users must select property values when requesting servers. For more
       information, see :ref:`server-pool-server-request-options`.

   * - ``created``
     - date
     - The date the server was added to the server pool.

   * - ``recycled``
     - date
     - The date the server was returned to the pool.

   * - ``statusName``
     - string
     - The server's availability. Possible values are:

       .. list-table::

          * - ``AVAILABLE``
            - The server is available to host new MongoDB instances. It is not
              bound to a project.

          * - ``RESERVED``
            - The server has been selected as part of a multi-server request
              that is still executing.

          * - ``BOUND``
            - The server is hosting one or more MongoDB processes. The server
              is visible only to the project that is running the processes.

          * - ``NEEDS_CLEAN``
            - The server is no longer hosting MongoDB processes and no longer
              bound to a project, but the server still contains the MongoDB data
              and logs. The server has not yet been returned to the server
              pool and is not visible to |onprem| users.

          * - ``TRASH``
            - The server is no longer hosting MongoDB processes and no longer
              bound to a project. The server no longer contains the MongoDB data
              and logs. The server has not yet been returned to the server
              pool and is not visible to |onprem| users.

          * - ``DELETED``
            - The server has been removed from |onprem|.

   * - ``boundGroupId``
     - string
     - The ID of the project where this server is in use.
