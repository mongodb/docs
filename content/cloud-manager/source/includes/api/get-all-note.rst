Response Document
~~~~~~~~~~~~~~~~~

The response |json| document includes an array of :guilabel:`result`
objects, an array of :guilabel:`link` objects and a count of the total
number of :guilabel:`result` objects retrieved.

.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``results``
     - array
     - Array includes one object for each item detailed in the
       :ref:`results-embedded-document-get-all` section.
   * - ``links``
     - array
     - Array includes one or more links to sub-resources
       and/or related resources. The relations between |url|\s are
       explained in the :rfc:`Web Linking Specification <5988>`.
   * - ``totalCount``
     - number
     - Integer count of the total number of items in the result set. It
       may be greater than the number of objects in the
       :guilabel:`results` array if the entire result set is paginated.

.. _results-embedded-document-get-all:

``results`` Embedded Document
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
