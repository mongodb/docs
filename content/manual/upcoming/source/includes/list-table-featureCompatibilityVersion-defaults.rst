.. list-table::
   :header-rows: 1
   :widths: 38 72

   * - Deployments
     - ``featureCompatibilityVersion``

   * - For new 8.3 deployments                                                                                                     
     - ``"8.3"``                                                                                                                   
                                                                                                                                     
   * - For 8.3 deployments :ref:`upgraded from 8.2 <8.3-upgrade>`
     - ``"8.2"`` until you :dbcommand:`setFeatureCompatibilityVersion` to ``"8.3"``.

   * - For new 8.0 deployments
     - ``"8.0"``

   * - For 8.0 deployments :ref:`upgraded from 7.0 <8.0-upgrade>`
     
     - ``"7.0"`` until you :dbcommand:`setFeatureCompatibilityVersion` to ``"8.0"``.

   * - For new 7.0 deployments
     - ``"7.0"``

   * - For 7.0 deployments :ref:`upgraded from 6.0 <7.0-upgrade>`
     
     - ``"6.0"`` until you :dbcommand:`setFeatureCompatibilityVersion` to ``"7.0"``.
