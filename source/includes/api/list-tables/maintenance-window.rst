.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - dayOfWeek
     - integer
     - Day of the week when you would like the maintenance window to
       start as a 1-based integer.

       .. list-table::
          :header-rows: 1
          :widths: 60 40

          * - Day of Week
            - Integer

          * - Sunday
            - ``1``

          * - Monday
            - ``2``

          * - Tuesday
            - ``3``

          * - Wednesday
            - ``4``

          * - Thursday
            - ``5``

          * - Friday
            - ``6``

          * - Saturday
            - ``7``

   * - hourOfDay
     - integer
     - Hour of the day when you would like the maintenance window to
       start. This parameter uses the 24-hour clock, where midnight is
       ``0``, noon is ``12``.
