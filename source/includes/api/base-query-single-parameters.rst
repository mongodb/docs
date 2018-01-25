.. list-table::
   :widths: 10 10 70 10
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description
     - Default

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

       status
         HTTP response code
       envelope
         The expected response body 

     - ``false``
