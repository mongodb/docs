The version of your existing |onprem| installation determines the 
upgrade path you must take to upgrade to Ops Manager 3.6 or later. 

.. important::

   - You must follow the upgrade path for your existing version to
     perform necessary database migrations.

   - To protect your data, Ops Manager refuses to start direct upgrades
     from versions 1.8.x and 2.0.x to version 3.6 or later.

   - In :doc:`high availability environments </tutorial/configure-application-high-availability>`, 
     you must shut down every |onprem| application server before 
     starting any |onprem| application servers with the new version 
     installed.

The following table lists upgrade paths for all versions:

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Existing Version

     - Upgrade Path

   * - 3.6.x
     - Use this tutorial to upgrade from |onprem| on 3.6.x to a more 
       recent 3.6.x version.

   * - 3.4.x
     - Use this tutorial to upgrade from |onprem| 3.4.x to version 
       3.6.x.

   * - 2.x

     - 1. Upgrade from |onprem| 2.0.x to version 3.4.x. For the specific
          upgrade path for your version, refer to :v3.4:`v3.4 upgrade
          documentation </tutorial/nav/upgrade-application>`.

       #. .. include:: /includes/3.6-upgrade-check.rst

          For more information, see :ref:`data-migration-status`.

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
   and ``gen.key`` files because the upgrade process will delete
   existing data.
