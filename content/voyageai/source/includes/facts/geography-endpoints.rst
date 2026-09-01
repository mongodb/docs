.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Endpoint
     - Geography

   * - ``ai.mongodb.com``
     - Unscoped. |service| can serve the request from any
       Geography.

   * - ``eu.ai.mongodb.com``
     - Europe

   * - ``us.ai.mongodb.com``
     - United States

Scoped endpoints follow the pattern
``<geography>.ai.mongodb.com``, where ``<geography>`` is the
``geography`` value of the {+model-api-key+} that you send with
the request.
