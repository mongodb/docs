.. list-table::
   :widths: 15 10 65 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description
     - Default

   * - ``pretty``
     - boolean
     - Flag indicating whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - ``envelope``
     - boolean
     - Flag indicating whether or not to wrap the response in an
       envelope.

       Some API clients cannot access the HTTP response headers or
       status code. To remediate this, set ``envelope=true`` in the
       query.

       For endpoints that return one result, the response body
       includes:

       .. list-table::
          :widths: 15 85
          :header-rows: 1
          :stub-columns: 1

          * - Name
            - Description

          * - ``status``
            - |http| response code
          * - ``envelope``
            - Expected response body

     - ``false``
