.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - A unique identifier for the request.

   * - ``numServers``
     - number
     - The number of servers requested.

   * - ``created``
     - date
     - The date and time the request was issued.

   * - ``expires``
     - date
     - The date and time the request expires if no server is available.

   * - ``completeDate``
     - date
     - The date and time the request was completed.

   * - ``cancelDate``
     - date
     - The date and time the request was cancelled.

   * - ``groupId``
     - string
     - The project for which the server is requested.

   * - ``properties``
     - object of key/value pairs
     - The properties that identify the type of server requested.

   * - ``statusName``
     - string
     - The status of the request. Possible values are:

       .. list-table::

          * - ``EXECUTING``
            - The request is pending.

          * - ``CANCELLING``
            - The request is in the process of cancelling.

          * - ``CANCELLED``
            - The request is cancelled.

          * - ``FAILED``
            - The request failed.

          * - ``COMPLETED``
            - The request has been fulfilled.
