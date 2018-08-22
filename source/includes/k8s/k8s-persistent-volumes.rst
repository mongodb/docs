Flag indicating if this |k8s-mdbrsc| should use
`persistent volumes <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`__
for storage. Persistent volumes are not deleted when the |k8s-mdbrsc|
is stopped or restarted.

.. note::

   If you do not use persistent volumes, the :guilabel:`Disk Usage`
   and :guilabel:`Disk IOPS` charts cannot be displayed in either the
   :guilabel:`Processes` tab on the :guilabel:`Deployment` page or in
   the :guilabel:`Metrics` page when  
   :doc:`reviewing the data </tutorial/view-diagnostics>` for this
   deployment.
