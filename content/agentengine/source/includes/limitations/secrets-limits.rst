The platform enforces the following limits on secrets:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Scope
     - Limit

   * - Per project
     - 100

   * - Per workspace
     - 100

If you exceed a secret limit, the request returns a ``400 Bad
Request`` error with a ``RESOURCE_LIMIT_EXCEEDED`` message.
