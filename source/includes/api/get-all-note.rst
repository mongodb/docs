Response Document
~~~~~~~~~~~~~~~~~

The response |json| document includes an array of **result**
objects, an array of **link** objects and a count of the total
number of **result** objects retrieved.

.. list-table::
   :widths: 20 14 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - results
     - array of objects
     - One object for each item detailed in the
       `results Embedded Document <#results-embedded-document>`_ 
       section.

   * - links
     - array of objects
     - .. include:: /includes/api/links-explanation.rst

   * - totalCount
     - integer
     - Count of the total number of items in the result set. It may
       be greater than the number of objects in the **results**
       array if the entire result set is paginated.

results Embedded Document
~~~~~~~~~~~~~~~~~~~~~~~~~
