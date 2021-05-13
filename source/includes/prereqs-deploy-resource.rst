To deploy a |deployment| using an |k8s-obj|, you need to complete the
following procedures:

- :doc:`Install Kubernetes Operator </tutorial/install-k8s-operator>`

- :ref:`create-k8s-project`

- :ref:`create-k8s-credentials`

Alternatively, for |cloud|, after installing the Kubernetes Operator, 
you can use the |cloud-short| :cloudmgr:`UI 
</tutorial/nav/k8s-config-for-mdb-resource/>` to automatically generate 
the ConfigMap and Kubernetes secret YAML files, which you can then 
apply to your Kubernetes environment.
