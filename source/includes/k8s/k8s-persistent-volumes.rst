.. warning::

   Your containers must have permissions to write to your |k8s-pv|.
   The |k8s-op-short| sets ``fsGroup = 2000`` in 
   `securityContext <https://kubernetes.io/docs/tasks/configure-pod-container/security-context/>`__
   This makes |k8s|
   `try to fix write permissions <https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#discussion>`__
   for the |k8s-pv|. If redeploying the deployment item does not fix
   issues with your |k8s-pvs|, contact MongoDB support.

.. note::

   If you do not use |k8s-pvs|, the :guilabel:`Disk Usage` and
   :guilabel:`Disk IOPS` charts cannot be displayed in either the
   :guilabel:`Processes` tab on the :guilabel:`Deployment` page or in
   the :guilabel:`Metrics` page when
   :opsmgr:`reviewing the data </tutorial/view-diagnostics>` for this
   deployment.
