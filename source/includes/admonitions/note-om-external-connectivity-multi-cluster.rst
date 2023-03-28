To connect member clusters to the |onprem| resource's deployment in the
central cluster in a |multi-cluster|, use one of the following methods:

- Set the :opsmgrkube:`spec.externalConnectivity` to ``true`` and specify
  the |onprem| port in it. Use the :github:`ops-manager-external.yaml
  </mongodb/mongodb-enterprise-kubernetes/blob/master/samples/ops-manager/ops-manager-external.yaml>`
  example script, modify it to your needs, and apply the configuration.
  For example, run:

  .. code-block:: sh

     kubectl apply \
      --context "$MDB_CENTRAL_CLUSTER_FULL_NAME" \
      --namespace "mongodb" \
       -f https://raw.githubusercontent.com/mongodb/mongodb-enterprise-kubernetes/master/samples/ops-manager/ops-manager-external.yaml

- Add the central cluster and all member clusters to the service mesh.
  The service mesh establishes communication from the central and all
  member clusters to the |onprem| instance. To learn more, see the
  :ref:`Multi-Kubernetes-Cluster Quick Start <multi-cluster-quick-start-ref>`
  procedures and see the step that references the ``istio-injection=enabled``
  label for Istio. Also, see `Automatic sidecar injection
  <https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#automatic-sidecar-injection>`__
  in the Istio documentation.
