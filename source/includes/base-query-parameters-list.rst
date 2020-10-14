.. list-table::
  :widths: 10 10 70 10
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
    - Displays response in a `prettyprint <https://en.wikipedia.org/wiki/Prettyprint?oldid=791126873>`_ format.
    - ``false``

  * - ``envelope``
    - boolean
    - Specifies whether or not to wrap the response in an :ref:`envelope <api-envelope>`.
    - ``false``
