The response |json| document includes an array of :guilabel:`result`
objects, an array of :guilabel:`link` objects, and a count of the total
number of :guilabel:`result` objects retrieved.

.. list-table::
   :widths: 20 14 66
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - results
     - array
     - List of items detailed in the `results array`_ section.

   * - links
     - array
     - .. include:: /includes/api/links-explanation.rst

   * - totalCount
     - number
     - Count of the total number of items in the result set. It may be
       greater than the number of objects in the :guilabel:`results`
       array if the entire result set is paginated.
