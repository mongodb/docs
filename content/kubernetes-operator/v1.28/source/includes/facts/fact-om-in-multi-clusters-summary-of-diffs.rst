To deploy a single |onprem| instance in the operator cluster and connect to it,
use the following procedures:

- :ref:`Review the Ops Manager resource architecture <meko-om-arch>`
- :ref:`Review the Ops Manager resource considerations and prerequisites <plan-om-resource>`
- :ref:`Deploy an Ops Manager instance on the central cluster with TLS encryption <deploy-om-container>`

These procedures are the same as the procedures for deploying |onprem| in single clusters with the following exceptions:

- **Set the context and the namespace.**

  .. include:: /includes/admonitions/note-om-context-scope-multi-cluster.rst

- **Configure external connectivity for Ops Manager.**

  .. include:: /includes/admonitions/note-om-external-connectivity-multi-cluster.rst

- **Deploy Ops Manager and the {+appdb+} on the central cluster.**

  You can choose to deploy |onprem| and the {+appdb+} only on the central cluster,
  using the same procedure as for single MongoDB resources |k8s| clusters. To learn more,
  see :ref:`Deploy an Ops Manager instance on the central cluster with TLS encryption <deploy-om-container>`.

- **Deploy Ops Manager on the central cluster and the {+appdb+} on selected member clusters.**

  You can choose to deploy |onprem| on the central cluster and the Application
  Database on a subset of selected member clusters, to increase the
  {+appdb+}\'s resilience and availability in |onprem|. Configure
  the following settings in the |onprem| CRD:

  - Use :opsmgrkube:`topology <spec.applicationDatabase.topology>` to specify the ``MultiCluster`` value.

  - Specify the :opsmgrkube:`clusterSpecList <spec.applicationDatabase.clusterSpecList>` and
    include in it the :opsmgrkube:`clusterName <spec.applicationDatabase.clusterSpecList.clusterName>`
    of each selected |k8s| member cluster on which you want to deploy the {+appdb+}, and the
    number of :opsmgrkube:`members <spec.applicationDatabase.clusterSpecList.members>`
    (MongoDB nodes) in each |k8s| member cluster.

  .. note::

     If you deploy the {+appdb+} on selected member clusters in
     your |multi-cluster|, you must include the central cluster and
     member clusters in the same service mesh configuration. This enables
     bi-directional communication from |onprem| to the {+appdb+}.

  To learn more, see :ref:`Deploy Ops Manager <deploy-om-container>`,
  review the |multi-cluster| example and specify ``MultiCluster`` for
  :opsmgrkube:`topology <spec.applicationDatabase.topology>`.
