.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - dayOfWeek
     - number
     - Required
     - Day of the week that you want the maintenance window to
       start, as a 1-based integer.

       .. list-table::
          :header-rows: 1
          :widths: 60 40

          * - Day of Week
            - Integer

          * - Sunday
            - **1**

          * - Monday
            - **2**

          * - Tuesday
            - **3**

          * - Wednesday
            - **4**

          * - Thursday
            - **5**

          * - Friday
            - **6**

          * - Saturday
            - **7**

   * - hourOfDay
     - number
     - Required
     - Hour of the day that you want the maintenance window to
       start. This parameter uses the 24-hour clock, where midnight is
       **0** and noon is **12**.

   * - autoDeferOnceEnabled
     - boolean
     - Optional
     - Flag that indicates whether you want to defer all
       maintenance windows one week they would be triggered.
