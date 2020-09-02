.. list-table::
   :widths: 20 14 56 11
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description
     - Default

   * - pretty
     - boolean
     - Flag that indicates whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Flag that indicates whether or not to wrap the response in a
       |json| envelope.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, set **envelope=true** in the
       query.

       For endpoints that return one result, the response body
       includes:

       .. list-table::
          :widths: 15 85
          :header-rows: 1
          :stub-columns: 1

          * - Name
            - Description

          * - status
            - |http| response code
          * - envelope
            - Expected response body

     - ``false``
