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
     - Page number, starting with one, that |service| returns of the
       total number of objects.
     - ``1``

   * - itemsPerPage
     - integer
     - Optional
     - Number of items that |service| returns per page, up to a maximum
       of 500.
     - ``100``

   * - includeCount
     - boolean
     - Optional
     - Flag that indicates whether |service| returns the **totalCount**
       parameter in the response body.
     - ``true``

   * - pretty
     - boolean
     - Optional
     - Flag that indicates whether |service| returns the |json|
       response in the
       :wikipedia:`prettyprint </Prettyprint?oldid=791126873>` format.
     - ``false``

   * - envelope
     - boolean
     - Optional
     - Flag that indicates whether |service| wraps the response in an
       :ref:`envelope <api-envelope>`.

       Some |api| clients cannot access the |http| response headers or
       status code. To remediate this, set ``envelope=true`` in the
       query.

       Endpoints that return a list of results use the **results**
       object as an envelope. |service| adds the **status** parameter
       to the response body.

     - ``false``
