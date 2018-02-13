.. list-table::
   :widths: 10 10 70 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description
     - Default

   * - pageNum
     - integer
     - Page number (1-based).
     - ``1``

   * - itemsPerPage
     - integer
     - Maximum number of items to return, up to a maximum of 100.
     - ``100``

   * - pretty
     - boolean
     - Flag indicating whether the response body should be in a 
       `prettyprint <https://en.wikipedia.org/wiki/Prettyprint?oldid=791126873>`_ format.
     - ``false``

   * - envelope
     - boolean
     - Flag indicating whether or not to wrap the response in an 
       envelope.

       Some API clients cannot access the HTTP response headers or 
       status code. To remediate this, set ``envelope=true`` in the 
       query. 

       For endpoints that return one result, response body 
       includes:

       .. list-table::
          :widths: 30 70
          :header-rows: 1
          :stub-columns: 1

          * - status
            - HTTP response code
          * - envelope
            - The expected response body 

       For endpoints that return a list of results, the ``results`` 
       object is an envelope. |mms| adds the ``status`` field to the 
       response body.
     - 
