.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - 3.6 Deployments
     - ``featureCompatibilityVersion``

   * - For new deployments
     - ``"3.6"``

   * - For deployments :ref:`upgraded from 3.4 <3.6-upgrade>`
   
     - ``"3.4"`` until you :dbcommand:`setFeatureCompatibilityVersion`
       to ``"3.6"``.
