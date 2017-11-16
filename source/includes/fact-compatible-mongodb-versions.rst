You may run :term:`backing databases` on any of the following MongoDB
versions.

.. list-table::
   :header-rows: 1
   :widths: 30 70 

   * - |onprem|
     - Compatible MongoDB Versions

   * - 2.0.X
     -  
       - 2.6.6 or later
       - 3.0.6 or later
       - 3.2.0 or later
       - 3.4.0 or later

   * - 3.4.X
     - 
       - 3.0.8 or later
       - 3.2.0 or later
       - 3.4.0 or later
       - 3.6.0 or later (if 
         :manual:`featureCompatibilityVersion </reference/command/setFeatureCompatibilityVersion>` 
         is set to ``3.4``)

   * - 3.6.X
     - 
       - 3.2.0 or later
       - 3.4.0 or later
       - 3.6.0 or later

For more information on MongoDB version numbers, see 
:ref:`release-version-numbers` in the MongoDB Manual.

.. important::

   Only the MongoDB |onprem| :term:`backing databases` must meet this
   requirement. The MongoDB deployments that |onprem| manages do not.
   For the minimum versions required for managed MongoDB deployments,
   see :doc:`/reference/mongodb-compatibility/`.
