The platform enforces the following build limits for each project:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Limit
     - Value

   * - Concurrent active builds
     - 10

   * - Daily builds over a rolling 24-hour period
     - 100

If you exceed a build limit, the request returns a ``400 Bad Request``
error with a ``RESOURCE_LIMIT_EXCEEDED`` message.
