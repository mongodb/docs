Response Document
~~~~~~~~~~~~~~~~~

The response JSON document includes an array of ``result`` objects, an
array of ``link`` objects and a count of the total number of ``result``
objects retrieved.

.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``results``
     - array of objects
     - This array includes one object for each item detailed
       in the `results Embedded Document`_ section.
   * - ``links``
     - array of objects
     - This array includes one or more links to sub-resources
       and/or related resources. The relations between URLs are
       explained in the `Web Linking Specification
       <http://tools.ietf.org/html/rfc5988>`_.
   * - ``totalCount``
     - number
     - The count of the total number of items in the result set. It may
       be greater than the number of objects in the ``results`` array if
       the entire result set is paginated.

``results`` Embedded Document
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
