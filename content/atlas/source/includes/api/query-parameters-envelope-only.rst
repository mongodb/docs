.. list-table::
   :widths: 10 10 70 10
   :stub-columns: 1

   * - Name
     - Type
     - Description
     - Default

   * - ``envelope``
     - boolean
     - Indicates whether or not to wrap the response in an 
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

          * - ``status``
            - HTTP response code
          * - ``envelope``
            - The expected response body 

       For endpoints that return a list of results, the ``results``
       object is an envelope. |service| adds the ``status`` field to
       the response body.
     - ``false``
