To deploy a |deployment| using an |k8s-obj|, you must:

- Have or create an :doc:`Ops Manager instance <installation>` or a :ref:`Cloud Manager organization <create-organization>`.

- Have or install the :ref:`MongoDB Enterprise Kubernetes Operator <install-k8s>`.

- Create or generate a :ref:`Kubernetes Operator ConfigMap <create-k8s-project>`.

- Create :ref:`credentials for the Kubernetes Operator <create-k8s-credentials>` or 
  configure :ref:`a different secret storage tool <k8s-set-secret-storage-tool>`.

.. include:: /includes/facts/fact-can-change-secret-storage-tool.rst
