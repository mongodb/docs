You might receive the following error when you upgrade the
|k8s-op-short|:

.. code-block:: sh
   :copyable: false

   Forbidden: updates to statefulset spec for fields other than
   'replicas', 'template', and 'updateStrategy' are forbidden

If you receive this error, you use the following command to remove the
old |k8s-op-short| deployment:
