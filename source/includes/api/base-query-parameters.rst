.. list-table::
   :widths: 15 10 65 10
   :stub-columns: 1
   :header-rows: 1

   * - Name
     - Type
     - Description
     - Default

   * - pageNum
     - integer
     - Page number (1-index based).
     - ``1``

   * - itemsPerPage
     - integer
     - Number of items to return per page, up to a maximum of 500.
     - ``100``

   * - pretty
     - boolean
     - Indicates whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Indicates whether or not to wrap the response in an envelope.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, set ``"envelope" : true`` in the
       query.

       For endpoints that return one result, response body
       includes:

       .. list-table::
          :widths: 30 70
          :header-rows: 1
          :stub-columns: 1

          * - status
            - |http| response code
          * - envelope
            - Expected response body

       For endpoints that return a list of results, the ``results``
       object is an envelope. |mms| adds the ``status`` field to the
       response body.
     - None
