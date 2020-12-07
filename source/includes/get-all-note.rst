Response Document
~~~~~~~~~~~~~~~~~

The response |json| document includes an array of :guilabel:`result`
objects, an array of :guilabel:`link` objects, and a count of the total
number of :guilabel:`result` objects retrieved.

.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``results``
     - object array
     - Includes one object for each item detailed in the
       `results array`_ section.

   * - ``links``
     - object array
     - Includes one or more :ref:`links <api-linking>` to 
       sub-resources and/or related resources. The relations between 
       URLs are explained in the `Web Linking Specification
       <http://tools.ietf.org/html/rfc5988>`__.

   * - ``totalCount``
     - number
     - Count of the total number of items in the result set. It may be
       greater than the number of objects in the :guilabel:`results`
       array if the entire result set is paginated.

``results`` array
~~~~~~~~~~~~~~~~~
