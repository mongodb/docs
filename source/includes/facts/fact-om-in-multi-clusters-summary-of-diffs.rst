To deploy an |onprem| instance in the central cluster and connect to it,
use the following procedures:

- :ref:`Review the Ops Manager resource architecture <meko-om-arch>`
- :ref:`Review the Ops Manager resource considerations and prerequisites <plan-om-resource>`
- :ref:`Deploy an Ops Manager instance on the central cluster with TLS encryption <deploy-om-container>`

These procedures are the same as the procedures for single clusters
deployed with the |k8s-op-short| with the following exceptions:

- Run the procedures to deploy |onprem| only on the central cluster of your |multi-cluster|.

- Set the context and the |k8s-ns|.

  .. include:: /includes/admonitions/note-om-context-scope-multi-cluster.rst

- Configure external connectivity for |onprem|.

  .. include:: /includes/admonitions/note-om-external-connectivity-multi-cluster.rst
