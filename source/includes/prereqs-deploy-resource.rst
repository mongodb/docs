To deploy a |deployment| using an |k8s-obj|, you must:

- Have or create an :opsmgr:`Ops Manager instance </installation>` or a :opsmgr:`Cloud Manager organization </tutorial/manage-organizations/#create-organization>`.

- Have or install the :ref:`MongoDB Controllers for Kubernetes Operator <install-k8s>`.

- Create or generate a :ref:`Kubernetes Operator ConfigMap <create-k8s-project>`.

- Create :ref:`credentials for the Kubernetes Operator <create-k8s-credentials>` or 
  configure :ref:`a different secret storage tool <k8s-set-secret-storage-tool>`.

.. include:: /includes/facts/fact-can-change-secret-storage-tool.rst
