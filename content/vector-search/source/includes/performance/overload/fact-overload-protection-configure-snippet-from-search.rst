.. This file is snippet output generated from content/search/source/includes/performance/overload/fact-overload-protection-configure.rst.
   Do not modify this file. Edit the source file instead.

Configure Search Load Shedding per cluster. The setting accepts
the following states:

.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - State
     - API Value
     - Description

   * - Atlas Managed
     - No override
     - |service| selects the state based on the MongoDB version that
       your cluster runs. |service| resolves this state to :guilabel:`Off` 
       on MongoDB 8.0 and 8.3, and to :guilabel:`On` on MongoDB 9.0 or 
       later.

   * - On
     - ``true``
     - The admission control queue is bounded. |service| queues excess
       queries up to a capacity limit, then rejects further queries
       with a ``489`` error while the queue is full.

   * - Off
     - ``false``
     - The admission control queue is unbounded. |service| queues
       every excess query and never rejects a query.

Use the {+atlas-ui+} or the {+atlas-admin-api+} to change the state.

