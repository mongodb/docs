.. list-table::
  :header-rows: 1
  :widths: 25 75

  * - Intensity Level

    - Description

  * - ``critical``

    - The |HM| on this facet is enabled and has the ability to move the 
      failing :ref:`mongos <mongos>` out of the cluster if an error 
      occurs. The |HM| waits the amount of time specified by 
      :parameter:`activeFaultDurationSecs` before stopping and moving 
      the :ref:`mongos <mongos>` out of the cluster automatically.

  * - ``non-critical``

    - The |HM| on this facet is enabled and logs
      errors, but the :ref:`mongos <mongos>` remains in the cluster if 
      errors are encountered. 

  * - ``off``

    - The |HM| on this facet is disabled. The :ref:`mongos 
      <mongos>` does not perform any health checks on this facet. This
      is the default intensity level.
