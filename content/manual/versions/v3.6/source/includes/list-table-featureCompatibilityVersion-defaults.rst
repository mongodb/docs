.. list-table::
   :header-rows: 1
   :widths: 38 62

   * - Deployments
     - ``featureCompatibilityVersion``

   * - For new 3.6 deployments
     - ``"3.6"``

   * - For deployments :ref:`upgraded from 3.4 <3.6-upgrade>`
   
     - ``"3.4"`` until you :dbcommand:`setFeatureCompatibilityVersion`
       to ``"3.6"``.

   * - For new 3.4 deployments
     - ``"3.4"``

   * - For deployments :ref:`upgraded from 3.2 <3.4-upgrade>`
   
     - ``"3.2"`` until you :dbcommand:`setFeatureCompatibilityVersion`
       to ``"3.4"``.
