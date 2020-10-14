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

   * - ``includeCount``
     - boolean
     - Optional
     - Specifies whether the response returns the ``totalCount`` field.
     - ``true``

   * - pretty
     - boolean
     - Optional
     - Indicates whether the response body should be in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Optional
     - Flag indicating if |service| should wrap the response in a
       |json| envelope.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, set ``envelope=true`` in the
       query.

       For endpoints that return one result, the response body
       includes:

       .. list-table::
          :widths: 30 70
          :stub-columns: 1

          * - status
            - |http| response code
          * - envelope
            - Expected response body

       For endpoints that return a list of results, the **results**
       object is an envelope. |service| adds the **status** field to
       the response body.

     - ``false``
