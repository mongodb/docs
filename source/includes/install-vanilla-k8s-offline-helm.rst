Before continuing, install Helm following the instructions on
:gh:`GitHub </kubernetes/helm>`.

To install the |k8s-op-short| on a host not connected to the
Internet, you have two options, you can download the
|k8s-op-short| files from either:

.. tabs::

    tabs:
      - id: internet
        name: The Internet
        content: |

          1. Connect to the Internet.

          #. Use ``docker`` to request the files.

             .. code-block:: sh

                docker pull quay.io/mongodb/mongodb-enterprise-operator:<op-version>; \
                docker pull quay.io/mongodb/mongodb-enterprise-database:<op-version>; \
                docker pull quay.io/mongodb/mongodb-enterprise-ops-manager:<om-version>-operator<op-version>

             Where ``<op-version>`` is the |k8s-op-short| version you're 
             installing and ``<om-version>`` is the |onprem| version 
             you're installing.

          #. Disconnect from the Internet.

          #. Install the |k8s-op-short| with modified pull
             policy values using the following ``helm``
             command:

             .. code-block:: sh

                helm template --set registry.pullPolicy=IfNotPresent \
                helm_chart > operator.yaml \
                -- values helm_chart/values.yaml
                kubectl apply -f operator.yaml

             You can customize your Chart before installing it by
             modifying the ``values.yaml`` file. For this
             Chart, you may need to add one or more of the following
             options:

             .. include:: /includes/list-tables/k8s-helm-install-options.rst

             You can also pass these values as options when you apply the helm
             chart:

             .. code-block:: sh

                helm template --set namespace=<testNamespace> \
                helm_chart > operator.yaml \
                -- values helm_chart/values.yaml
                kubectl apply -f operator.yaml

          To troubleshoot your |k8s-op-short|, see
          :ref:`review-k8s-op-logs`.

          .. include:: /includes/admonitions/fact-remove-k8s-resources-first.rst

      - id: host
        name: Another Host
        content: |

          #. Use ``docker`` to request the files on a host
             connected to the Internet.

             .. code-block:: sh

                docker pull quay.io/mongodb/mongodb-enterprise-operator:<op-version>; \
                docker pull quay.io/mongodb/mongodb-enterprise-database:<op-version>; \
                docker pull quay.io/mongodb/mongodb-enterprise-ops-manager:<om-version>-operator<op-version>

             Where ``<op-version>`` is the |k8s-op-short| version you're 
             installing and ``<om-version>`` is the |onprem| version 
             you're installing.

          #. Save the Operator files to transferrable files.

             .. code-block:: sh

                docker save quay.io/mongodb/mongodb-enterprise-operator:<op-version> -o mongodb-enterprise-operator.tar; \
                docker save quay.io/mongodb/mongodb-enterprise-database:<op-version> -o mongodb-enterprise-database.tar; \
                docker save quay.io/mongodb/mongodb-enterprise-ops-manager:<om-version>-operator<op-version> -o mongodb-enterprise-ops-manager.tar

             Where ``<op-version>`` is the |k8s-op-short| version you're 
             installing and ``<om-version>`` is the |onprem| version 
             you're installing.

          #. Copy these ``.tar`` files to the host running the
             |k8s| ``docker`` daemon.

          #. Import the ``.tar`` files into ``docker``.

             .. code-block:: sh

                docker import mongodb-enterprise-operator.tar quay.io/mongodb/mongodb-enterprise-operator:<op-version>; \
                docker import mongodb-enterprise-database.tar quay.io/mongodb/mongodb-enterprise-database:<op-version>; \
                docker import mongodb-enterprise-ops-manager.tar quay.io/mongodb/mongodb-enterprise-ops-manager:<om-version>-operator<op-version>

             Where ``<op-version>`` is the |k8s-op-short| version you're 
             installing and ``<om-version>`` is the |onprem| version 
             you're installing.

             #. Install the |k8s-op-short| with modified pull
                policy values using the following ``helm``
                command:

                .. code-block:: sh

                   helm template --set registry.pullPolicy=IfNotPresent \
                   helm_chart > operator.yaml \
                   -- values helm_chart/values.yaml
                   kubectl apply -f operator.yaml

                You can customize your Chart before installing it by
                modifying the ``values.yaml`` file. For this
                Chart, you may need to add one or more of the following
                options:

                .. include:: /includes/list-tables/k8s-helm-install-options.rst

                You can also pass these values as options when you apply the helm
                chart:

                .. code-block:: sh

                   helm template --set namespace=<testNamespace> \
                   helm_chart > operator.yaml \
                   -- values helm_chart/values.yaml
                   kubectl apply -f operator.yaml

             To troubleshoot your |k8s-op-short|, see
             :ref:`review-k8s-op-logs`.

             .. include:: /includes/admonitions/fact-remove-k8s-resources-first.rst
