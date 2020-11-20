.. list-table::
   :widths: 15 10 65 10
   :header-rows: 1
   :stub-columns: 1
 
   * - Name
     - Type
     - Description
     - Default
 
   * - ``pageNum``
     - integer
     - Page number (1-based).
     - ``1``
 
   * - ``itemsPerPage``
     - integer
     - Number of items to return per page, up to a maximum of 500.
     - ``100``

   * - ``includeCount``
     - boolean
     - Specifies whether the response returns the ``totalCount`` field.
     - ``true``
 
   * - ``pretty``
     - boolean
     - Display response in a `prettyprint <https://en.wikipedia.org/wiki/Prettyprint?oldid=791126873>`_ format.
     - ``false``
 
   * - ``envelope``
     - boolean
     - Specifies whether or not to wrap the response in an :ref:`envelope <api-envelope>`.
     - ``false``
 
   * - ``eventType``
     - string
     - Returns events whose event type matches the specified value.
 
       Possible values include:
 
       .. include:: /includes/api/list-tables/alert-eventTypeNames.rst

     -
 
   * - ``minDate``
     - date
     - Returns events whose created date is greater than or equal to the 
       specified ISO-8601 ``minDate``.
     - 
 
   * - ``maxDate``
     - date
     - Returns events whose created date is less than or equal to the
       specified ISO-8601  ``maxDate``.
     - 

   * - ``includeRaw``
     - boolean
     - Specifies whether to include the ``raw`` document in the output.
       The ``raw`` document contains additional meta information about
       the event.

       .. important::

         The values in the ``raw`` document are subject to change. Do
         not rely on ``raw`` values for formal monitoring.
     - ``false``
