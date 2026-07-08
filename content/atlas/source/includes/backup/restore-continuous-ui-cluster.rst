You can enable {+PIT-Restore+}s for dedicated {+clusters+}
when you :ref:`create <create-new-cluster>` or
:ref:`scale <scale-cluster-backups>` a cluster.

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: Click :guilabel:`Point in Time Restore`.

      Click the :guilabel:`Point in Time Restore` button on the
      far right side of the screen.

   .. step:: Select either the :guilabel:`Date & Time`
      or :guilabel:`Oplog Timestamp` tab.

      If you select the :guilabel:`Date & Time` option, you can
      specify the time of restore with one minute of granularity.
      If you select the :guilabel:`Oplog Timestamp` option, you
      can specify the time of restore with one second of
      granularity.

   .. step:: Enter the desired point in time to restore from.

      .. important::

         You can restore a {+cluster+} from any time during its
         {+pit-restore+} window **except** between when you
         initiated a restore and when |service| completes a
         snapshot after the restore.

   .. step:: Click the :guilabel:`Next: Select Cluster` button.

   .. step:: Choose a project and cluster to restore to from
      the dropdown menus.

      .. important::

         |service| might create a host rollback alert due to
         differences in the data between the source and target
         clusters. You can ignore this alert.

   .. step:: Click the :guilabel:`Restore` button.
