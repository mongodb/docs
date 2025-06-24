.. list-table::
  :header-rows: 1
  :widths: 25 50 25

  * - Field

    - Description

    - Units

  * - ``interval``

    - How often to ensure |HMS| are not stuck or unresponsive.

    - Milliseconds

  * - ``deadline``

    - Timeout before automatically failing the :ref:`mongos <mongos>` 
      if a |HM| check is not making progress.
    
    - Seconds
