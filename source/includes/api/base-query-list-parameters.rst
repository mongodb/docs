.. list-table::
   :widths: 20 14 11 45 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description
     - Default

   * - pageNum
     - number
     - Optional
     - One-based integer that returns a subsection of results.
     - ``1``

   * - itemsPerPage
     - number
     - Optional
     - Number of items to return per page, up to a maximum of 500.
     - ``100``

   * - pretty
     - boolean
     - Optional
     - Flag that indicates whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Optional
     - Flag that indicates whether or not to wrap the response in an
       envelope.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, set ``envelope : true`` in the
       query.

       For endpoints that return a list of results, the ``results``
       object is an envelope. |mms| adds the ``status`` field to the
       response body.

     - ``false``
