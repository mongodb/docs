.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - 3.4 Deployments
     - ``featureCompatibilityVersion``

   * - For new deployments
     - ``"3.4"``

   * - For deployments :ref:`upgraded from 3.2 <3.4-upgrade>`
   
     - ``"3.2"`` until you :dbcommand:`setFeatureCompatibilityVersion`
       to ``"3.4"``.
