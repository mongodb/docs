Response Document
~~~~~~~~~~~~~~~~~

The response |json| document includes an array of :guilabel:`result`
objects, an array of :guilabel:`link` objects and a count of the total
number of :guilabel:`result` objects retrieved.

.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``results``
     - object array
     - This array includes one object for each item detailed
       in the `results Embedded Document`_ section.
   * - ``links``
     - object array
     - This array includes one or more links to sub-resources
       and/or related resources. The relations between URLs are
       explained in the :rfc:`Web Linking Specification <5988>`.
   * - ``totalCount``
     - integer
     - Count of the total number of items in the result set. It may
       be greater than the number of objects in the :guilabel:`results`
       array if the entire result set is paginated.

`results` Embedded Document
~~~~~~~~~~~~~~~~~~~~~~~~~~~
