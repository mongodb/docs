.. list-table::
   :widths: 20 14 11 46 10
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
     - Page number, starting with one, returned of the total number of
     - ``1``

   * - itemsPerPage
     - integer
     - Optional
     - Number of items returned per page, up to a maximum of 500.
     - ``100``

   * - ``includeCount``
     - boolean
     - Optional
     - Flag that indicates whether the response returns the
       **totalCount** field.
     - ``true``

   * - pretty
     - boolean
     - Optional
     - Flag that indicates whether the response returned in a
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Optional
     - Flag that indicates whether |mms| wraps the response in an
       :ref:`envelope <api-envelope>`.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, set ``envelope=true`` in the
       query.

       Endpoints that return a list of results use the **results**
       object as an envelope. |service| adds the **status** field to
       the response body.

     - ``false``
