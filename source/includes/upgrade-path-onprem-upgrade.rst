The version of your existing |onprem| installation determines your upgrade
path. The following table lists upgrade paths per version:

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Existing Version

     - Upgrade Path

   * - 1.6 or later

     - Use this procedure to upgrade directly to the latest version.

   * - 1.5

     - 1. Upgrade to 1.8 using the :v1.8:`upgrade procedure in the v1.8
          documentation </tutorial/nav/upgrade-application-daemon>`.

       2. Use this procedure to upgrade to the latest version.

   * - 1.4 or earlier

     - 1. Upgrade to 1.6 using the :v1.6:`upgrade procedure in the v1.6
          documentation </tutorial/nav/upgrade-application-daemon>`.

       2. Upgrade to 1.8 using the :v1.8:`upgrade procedure in the v1.8
          documentation </tutorial/nav/upgrade-application-daemon>`.

       3. Use this procedure to upgrade to the latest version.

There are no supported downgrade paths for |onprem|.

.. important:: It is crucial that you back up the existing
   configuration because the upgrade process will delete existing
   data.
