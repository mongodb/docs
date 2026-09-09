Optional. Path to a PEM-encoded CA bundle that the
|k8s-op-short| uses to reach a member cluster's
|k8s-api-server|, in the format
``--member-cluster-ca <member-cluster-name>=<path-to-pem-file>``.
Repeat the option once for each member cluster that
requires its own CA bundle. If you omit a member
cluster, the |kubectl-mongodb| uses the CA from that
cluster's service account token secret. To learn more,
see :ref:`kubectl-mongodb-mc-custom-ca`.
