The version of your existing |onprem| installation determines your upgrade
path. The following table lists upgrade paths per version:

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Existing Version

     - Upgrade Path

   * - 2.0 or later

     - |onprem| supports direct upgrades from version 2.0.x. Use this
       tutorial to upgrade directly to 3.4.0.

   * - 1.8 or earlier

     - 1. Follow the appropriate upgrade path to upgrade your version
          to 2.0. For the specific upgrade path for your version, refer to
          :v2.0:`v2.0 upgrade documentation
          </tutorial/nav/upgrade-application-daemon>`.

       #. Once upgraded to 2.0.x, use this tutorial to upgrade to 3.4.0.

There are no supported downgrade paths for |onprem|.

.. important::

   It is crucial that you back up the existing ``conf-mms.properties``
   file because the upgrade process will delete existing data.
