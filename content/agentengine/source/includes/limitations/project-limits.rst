The following table lists the resource limits for each project:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Resource
     - Limit

   * - Workspaces
     - 25

   * - API keys
     - 100

   * - Credential providers
     - 100

   * - Project service accounts
     - 100

If you exceed a resource limit, the request returns a ``400 Bad
Request`` error with a ``RESOURCE_LIMIT_EXCEEDED`` message.
