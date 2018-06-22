The version of your existing |onprem| installation determines the 
upgrade path you must take to upgrade to Ops Manager 4.0 or later. 

.. important::

   - You must follow the upgrade path for your existing version to
     perform necessary database migrations.

   - To protect your data, Ops Manager refuses to start direct upgrades
     from versions 1.8.x and 2.0.x to version 3.4 or later.

   - In :doc:`high availability environments </tutorial/configure-application-high-availability>`, 
     you must shut down every |onprem| application server before 
     starting any |onprem| application servers upgraded to the new 
     version.

The following table lists upgrade paths for all versions:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Existing Version

     - Upgrade Path

   * - 4.0.x
     - Use this tutorial to upgrade from |onprem| 4.0.x to a more 
       recent 4.0.x version.

   * - 3.6.x
     - Use this tutorial to upgrade from |onprem| 3.6.x to version 
       4.0.x.

   * - 3.4.x
     - Use this tutorial to upgrade from |onprem| 3.4.x to version 
       3.6.x.

   * - 2.x or earlier

     - For the specific upgrade path for your version, refer to 
       :v3.4:`v3.4 upgrade documentation </tutorial/nav/upgrade-application>`.

There are no supported downgrade paths for |onprem|.

.. important::

   It is crucial that you back up the existing ``conf-mms.properties``
   and ``gen.key`` files because the upgrade process will delete
   existing data.
