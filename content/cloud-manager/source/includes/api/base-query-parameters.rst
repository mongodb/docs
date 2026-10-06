.. list-table::
   :widths: 20 14 55 11
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
     - Indicates whether to return the response body in a
       :wikipedia:`prettyprint <Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Indicates whether to wrap the response in an envelope.

       Some |api| clients can't access the |http| response headers or
       status code. To remediate this, set ``"envelope" : true`` in the
       query.

       For endpoints that return one result, response body
       includes:

       - ``status``: |http| response code

       - ``content``: Expected response body

       For endpoints that return a list of results, the ``results``
       object is an envelope. |mms| adds the ``status`` field to the
       response body.
     - None
