.. list-table::
   :widths: 15 10 10 55 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description
     - Default

   * - ``pretty``
     - boolean
     - Optional
     - Flag indicating whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - ``envelope``
     - boolean
     - Optional
     - Flag indicating whether or not to wrap the response in a |json|
       envelope.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, add ``envelope=true`` to the
       query.

       For endpoints that return one result, the response body
       includes:

       .. list-table::
          :widths: 30 70
          :stub-columns: 1

          * - ``status``
            - |http| response code
          * - ``envelope``
            - Expected response body

     - ``false``
