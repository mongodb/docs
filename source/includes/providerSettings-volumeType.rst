.. _provider-settings-volume-type:

Possible values are:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Volume Type
     - :ref:`providerSettings.diskIOPS
       <provider-settings-disk-iops>` Value

   * - ``STANDARD``

     - Must not exceed the default |iops| rate for the selected volume
       size.

   * - ``PROVISIONED``

     - Must fall within the allowable |iops| range for the selected
       volume size.
