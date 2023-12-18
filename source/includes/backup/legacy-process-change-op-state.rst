.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * - Initial State

     - Desired State

     - Method

   * - ``Inactive``

     - :guilabel:`Active` after ``Initial Sync``

     - Click :guilabel:`Start`.

   * - ``Active``

     - :guilabel:`Stopped`

     - Click :guilabel:`Stop`.

   * - ``Stopped``

     - :guilabel:`Active` after ``Initial Sync``

     - Click :guilabel:`Restart`.

   * - ``Stopped``

     - :guilabel:`Inactive`

     - Click :guilabel:`Terminate`.

       .. warning::
          :guilabel:`Terminate` deletes all retained backups.

.. important::

   You may receive a ``Backup requires a resync`` alert for your
   backup jobs. This may require you to :doc:`/tutorial/resync-backup`.
   This is not a different state, but a triggering of a new
   :ref:`Backup Process Flow <backup-initial-sync>`. Once ``Initial
   Sync`` completes, the backup job becomes :guilabel:`Active`
   again.
