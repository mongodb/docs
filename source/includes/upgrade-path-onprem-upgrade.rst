The version of your existing |onprem| installation determines the 
upgrade path you must take to upgrade to Ops Manager 3.6+. You must
follow the upgrade path for your currently installed version to perform
necessary database migrations. To protect your data, Ops Manager refuses
to start direct upgrades from versions 1.8.x and 2.0.x to version 3.6+.

The following table lists upgrade paths for all versions:

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Existing Version

     - Upgrade Path

   * - 3.4.x
     - 1. Use this tutorial to upgrade from |onprem| 3.4.x to version 
          3.6+.

   * - 2.x

     - 1. Upgrade from |onprem| 2.0.x to version 3.4.x. For the specific
          upgrade path for your version, refer to :v3.4:`v3.4 upgrade
          documentation </tutorial/nav/upgrade-application>`.
       
       #. Use this tutorial to upgrade from |onprem| 3.4.x to version 
          3.6+.

   * - 1.8.x or earlier

     - 1. Follow the appropriate upgrade path to upgrade your version
          to 2.0.x. For the specific upgrade path for your version, refer to
          :v2.0:`v2.0 upgrade documentation
          </tutorial/nav/upgrade-application-daemon>`.

       #. Upgrade from |onprem| 2.0.x to version 3.4.x. For the specific
          upgrade path for your version, refer to :v3.4:`v3.4 upgrade
          documentation </tutorial/nav/upgrade-application>`.
       
       #. Use this tutorial to upgrade from |onprem| 3.4.x to version 
          3.6+.

There are no supported downgrade paths for |onprem|.

.. important::

   It is crucial that you back up the existing ``conf-mms.properties``
   file because the upgrade process will delete existing data.
