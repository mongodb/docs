The following query parameters are optional:

.. list-table::
  :widths: 10 10 70 10
  :header-rows: 1
  :stub-columns: 1

  * - Query Parameter
    - Type
    - Description
    - Default

  * - pretty
    - boolean
    - Displays response in a `prettyprint <https://en.wikipedia.org/wiki/Prettyprint?oldid=791126873>`_ format.
    - ``false``

  * - envelope
    - boolean
    - Specifies whether or not to wrap the response in an :ref:`envelope <api-envelope>`.
    - ``false``

  * - includeRaw
    - boolean
    - Specifies whether to include the ``raw`` document in the output.
      The ``raw`` document contains additional meta information about
      the event.

      .. important::

        The values in the ``raw`` document are subject to change. Do
        not rely on ``raw`` values for formal monitoring.
    - ``false``
