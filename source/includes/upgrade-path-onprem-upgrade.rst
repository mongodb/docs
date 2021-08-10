The version of your existing |onprem| installation determines the
upgrade path you must take to upgrade to Ops Manager 4.2 or later.

.. important::

   - To ensure a successful upgrade, you *must* follow the upgrade path 
     for your existing version to perform necessary database migrations.

   - To protect your data, |onprem| refuses to start direct upgrades
     from versions 1.8.x and 2.0.x to version 3.4 or later.

   - To upgrade :doc:`high availability environments </tutorial/configure-application-high-availability>`,
     you must shut down every |onprem| application server before
     starting any |onprem| application servers upgraded to the new
     version.

The following table lists upgrade paths for all versions:

.. list-table::
   :widths: 15 85
   :header-rows: 1

   * - Existing Version

     - Upgrade Path

   * - 5.0.x
     - Use :ref:`the procedure on this page <upgrade-om-procedure>` to 
       upgrade from |onprem| 5.0.x to the latest patch version of 5.0.

   * - 4.4.x
     - Use :ref:`the procedure on this page <upgrade-om-procedure>` to 
       upgrade from |onprem| 4.4.x to the latest patch version of 5.0.

       If your current |onprem| version precedes 4.4.13, MongoDB 
       recommends using the procedure to upgrade to 4.4.13 before 
       upgrading to the latest patch version of 5.0.
     
       |onprem| version 4.4.13 fixes a bug that would re-enable
       |onprem| instances for |api| writes during an upgrade.

       .. seealso::
          
          :ref:`Ops Manager 4.4.13 release notes <opsmgr-server-4.4.13>` 

   * - 4.2.x
     - Use :ref:`the procedure on this page <upgrade-om-procedure>` to 
       upgrade from |onprem| 4.2.x to 4.2.24 or later *first*, then to 
       the latest patch version of 4.4.

       .. include:: /includes/facts/upgrade-to-om-4-2-24.rst

   * - 4.0.x
     - Use the
       :om-v4.2:`v4.2 upgrade tutorial </tutorial/nav/upgrade-application>`
       to upgrade from |onprem| 4.0.x to version 4.2.24 or later.

       .. include:: /includes/facts/upgrade-to-om-4-2-24.rst

   * - 3.6.x
     - Use the
       :om-v4.0:`v4.0 upgrade tutorial </tutorial/nav/upgrade-application>`
       to upgrade from |onprem| 3.6.x to version 4.0.x.

   * - 3.4.x
     - Use the
       :om-v3.6:`v3.6 upgrade tutorial </tutorial/nav/upgrade-application>`
       to upgrade from |onprem| 3.4.x to version 3.6.x.

   * - 2.x or earlier
     - Use the
       :om-v3.4:`v3.4 upgrade tutorial </tutorial/nav/upgrade-application>`
       to upgrade from |onprem| 2.x or earlier.

There are no supported downgrade paths for |onprem|.

