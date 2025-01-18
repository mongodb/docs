The version of your existing |onprem| installation determines the
upgrade path you must take to upgrade to |onprem| 4.4 or later.

.. important::

   - If you have an |onprem| 4.2 or later installation with more than one |onprem|
     host pointing to the same Application Database, you can upgrade
     |onprem| without incurring monitoring
     downtime. During this upgrade, |onprem| enters a state known as **Upgrade Mode**. 
     See :ref:`Upgrade Mode <upgrade-mode-for-ha-apps>`
     for more information.
  
   - To ensure a successful upgrade, you *must* follow the upgrade path 
     for your existing version to perform necessary database migrations.

   - To protect your data, |onprem| refuses to start direct upgrades
     from versions 1.8.x and 2.0.x to version 3.4 or later.

   - There are no supported downgrade paths for |onprem|.

.. note::

   All upgrades for |onprem| versions 4.2.x and later use 
   :ref:`the same procedure <upgrade-om-procedure>`. To upgrade to a
   higher version, you must first use this procedure upgrade to the 
   latest available patch of your initial version, then use the 
   procedure again to upgrade to the next version. If the following
   table has additional information related to the upgrade procedure 
   for a given version, review it first.

The following table lists upgrade paths for all versions:

.. list-table::
   :widths: 15 85
   :header-rows: 1

   * - Existing Version

     - Upgrade Path

   * - 6.0.x
     - Upgrade from |onprem| 6.0.x to the latest available patch 
       version of 6.0 using 
       :ref:`this procedure <upgrade-om-procedure>`.

       To learn more, see :ref:`Ops Manager 6.0 release notes <opsmgr-server-6.0>`.

   * - 5.0.x
     - Upgrade from |onprem| 5.0.x to the latest available patch 
       version of 5.0. Then upgrade to the latest available version of 
       6.0. Use :ref:`this procedure <upgrade-om-procedure>` for both
       processes.

       To learn more, see :ref:`Ops Manager 5.0 release notes <opsmgr-server-5.0>`.

   * - 4.4.x
     - Upgrade from |onprem| 4.4.x to the latest available patch 
       version of 4.4. Then upgrade to the latest available version of 
       5.0. Use :ref:`this procedure <upgrade-om-procedure>` for both
       processes.

       :gold:`IMPORTANT:` |onprem| version 4.4.13 fixes a bug that would re-enable
       |onprem| instances for |api| writes during an upgrade.

       To learn more, see: 
          
       - :ref:`Ops Manager 4.4 release notes <opsmgr-server-4.4>`.
       - :ref:`Ops Manager 4.4.13 release notes <opsmgr-server-4.4.13>`.

   * - 4.2.x
     - Upgrade from |onprem| 4.2.x to the latest available patch 
       version of 4.2. Then upgrade to the latest available version of 
       4.4. Use :ref:`this procedure <upgrade-om-procedure>` for both
       processes.

       .. include:: /includes/facts/upgrade-to-om-4-2-24.rst

   * - 4.0.x
     - Use the
       `v4.2 upgrade tutorial <https://www.mongodb.com/docs/ops-manager/current/tutorial/upgrade-ops-manager>`__
       to upgrade from |onprem| 4.0.x to version 4.2.24 or later. Then 
       use :ref:`this procedure <upgrade-om-procedure>` to upgrade to 
       the latest available version of 4.2.

       .. include:: /includes/facts/upgrade-to-om-4-2-24.rst

   * - 3.6.x
     - Use the
       `v4.0 upgrade tutorial <https://www.mongodb.com/docs/ops-manager/current/tutorial/upgrade-ops-manager>`__
       to upgrade from |onprem| 3.6.x to version 4.0.x.

   * - 3.4.x
     - Use the
       `v3.6 upgrade tutorial <https://www.mongodb.com/docs/ops-manager/current/tutorial/upgrade-ops-manager>`__
       to upgrade from |onprem| 3.4.x to version 3.6.x.

   * - 2.x or earlier
     - Use the
       `v3.4 upgrade tutorial <https://www.mongodb.com/docs/ops-manager/current/tutorial/upgrade-ops-manager>`__
       to upgrade from |onprem| 2.x or earlier.
