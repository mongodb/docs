.. list-table::
   :header-rows: 1
   :widths: 38 72

   * - Deployments
     - ``featureCompatibilityVersion``

   * - For new 6.0 deployments
     - ``"6.0"``

   * - For 6.0 deployments :ref:`upgraded from 5.0 <6.0-upgrade>`
     
     - ``"5.0"`` until you :dbcommand:`setFeatureCompatibilityVersion` to ``"6.0"``. 
