.. list-table::
   :widths: 25 10 75
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``dayOfWeek``
     - number
     - Day of the week that you want the maintenance window to
       start, as a 1-based integer.

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

   * - ``hourOfDay``
     - number
     - Hour of the day that you want the maintenance window to
       start. This parameter uses the 24-hour clock, where midnight is
       ``0`` and noon is ``12``.

   * - ``startASAP``
     - boolean
     - Flag indicating that you wanted maintenance started immediately
       upon receiving this request.

       To use ``startASAP : true``, you need to have
       :ref:`scheduled maintenance and set your own maintenance window <atlas-modify-project-settings>`.

       After you set ``startASAP : true``, the project's
       maintenance starts immediately. ``startASAP`` resets to
       ``false`` after |service| completes maintenance.

   * - ``numberOfDeferrals``
     - number
     - Number of times the current maintenance event for this project
       has been deferred.
