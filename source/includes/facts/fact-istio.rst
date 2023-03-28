We offer the :github:`install_istio_separate_network example script
</mongodb/mongodb-enterprise-kubernetes/blob/master/tools/multicluster/install_istio_separate_network.sh>`.
This script is based on Istio documentation and provides an example installation
that uses the `multi-primary mode on different networks <https://istio.io/latest/docs/setup/install/multicluster/multi-primary_multi-network/>`__.

We don't guarantee the script's maintenance with future Istio releases.
If you choose to use the script, review the latest Istio documentation for
`installing a multicluster <https://istio.io/latest/docs/setup/install/multicluster/>`__,
and, if necessary, adjust the script to match the documentation and your deployment.

If you use another service mesh solution, create your own script for
configuring separate networks to facilitate DNS resolution.