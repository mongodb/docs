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
     - Indicates whether the response body should be in a 
       `prettyprint <https://en.wikipedia.org/wiki/Prettyprint?oldid=791126873>`_ format.
     - ``false``

   * - envelope
     - boolean
     - Indicates whether or not to wrap the response in an 
       envelope.

       Some API clients cannot access the |http| response headers or 
       status code. To remediate this, set ``envelope=true`` in the 
       query. 

       For endpoints that return one result, the response body 
       includes:

       .. list-table::
          :widths: 30 70

          * - status
            - |http| response code
          * - envelope
            - The expected response body 

     - ``false``
