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
     - integer
     - Optional
     - Page number (1-based).
     - ``1``

   * - itemsPerPage
     - integer
     - Optional
     - Maximum number of items to return, up to a maximum of 100.
     - ``100``

   * - pretty
     - boolean
     - Optional
     - Indicates whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Optional
     - Indicates whether or not to wrap the response in an envelope.

       Some API clients cannot access the HTTP response headers or
       status code. To remediate this, set ``envelope=true`` in the
       query.

       For endpoints that return a list of results, the **results**
       object is an envelope. |service| adds the **status** field to
       the response body.

     - ``false``
