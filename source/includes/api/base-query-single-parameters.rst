.. list-table::
   :widths: 20 14 11 45 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description
     - Default

   * - pretty
     - boolean
     - Optional
     - Flag indicating whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Optional
     - Flag that indicates whether or not to wrap the response in an
       envelope.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, set **envelope=true** in the
       query.

       For endpoints that return one result, the response body
       includes:

       .. list-table::
          :widths: 30 70
          :header-rows: 1
          :stub-columns: 1

          * - Name
            - Description

          * - status
            - |http| response code
          * - envelope
            - Expected response body

     - ``false``
