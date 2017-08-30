Response Document
~~~~~~~~~~~~~~~~~

The response JSON document includes an array of ``result`` documents, an
array of ``link`` documents and a count of the total number of documents
retrieved.

.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``results``
     - document array
     - This document array includes one document for each item detailed
       in the `results Embedded Document`_ section.
   * - ``links``
     - document array
     - The ``links`` array includes one or more links to sub-resources
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
