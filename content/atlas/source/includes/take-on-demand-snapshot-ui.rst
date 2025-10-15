To take an on-demand snapshot:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Open the :guilabel:`On-Demand Snapshot` modal.
   
      a. Click the :icon:`ellipsis-h` button below the {+cluster+} name.
         
      #. Click :guilabel:`Take Snapshot Now`.

   .. step:: Take the snapshot.

      a. In the :guilabel:`On-Demand Snapshot` modal, enter the   
         following information:

         i. In the :guilabel:`Retention` box, enter the number of days 
            that you want |service| to retain the snapshot.

         #. In the :guilabel:`Description` box, enter a descriptive name
            for the snapshot.

      #. Click :guilabel:`Take Snapshot`.

To view an on-demand snapshot:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-backup-details.rst

   .. step:: View the on-demand snapshot.

      Click :guilabel:`Snapshots` for the {+cluster+}.

.. note::

   The :guilabel:`Take Snapshot Now` button also appears on the
   :guilabel:`Snapshots` page for the cluster.