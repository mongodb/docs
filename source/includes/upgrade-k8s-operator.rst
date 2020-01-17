1. Change to the directory in which you cloned the |k8s-op-short|
   repository. The following steps depend on how your environment is
   configured:

.. tabs::

   tabs:
     - id: kubectl
       name: Online using kubectl
       content: |

         .. _upgrade-k8s-operator-kubectl:

         2. Upgrade the |k8s-crds| for MongoDB deployments using the
            following |kubectl| command:

            .. code-block:: sh

               kubectl apply -f crds.yaml

         #. If you use `OpenShift <https://www.openshift.com/>`__ as
            your |k8s| orchestrator, you need to allow OpenShift to
            manage the Security Context for the |k8s-op-short|.

            Change the ``MANAGED_SECURITY_CONTEXT`` value as described
            in the next step.

         #. You can edit the Operator |yaml| file to further customize
            your Operator before upgrading it.

            a. Open your ``mongodb-enterprise.yaml`` in your preferred
               text editor.

            #. You may need to add one or more of the following
               options:

               .. include:: /includes/list-tables/k8s-kubectl-install-options.rst

               .. note::

                  Any values enclosed in single or double quotes
                  *require* those quotes. Include the quotes when
                  setting these values.

         #. Upgrade the |k8s-op-short| using the following
            |kubectl| command:

            .. code-block:: sh

               kubectl apply -f mongodb-enterprise.yaml

         To troubleshoot your |k8s-op-short|, see
         :ref:`review-k8s-op-logs`.

         .. include:: /includes/admonitions/fact-remove-k8s-resources-first.rst

     - id: helmonline
       name: Online using Helm
       content: |

         .. _upgrade-k8s-operator-helm:

         2. Upgrade the latest version of the |k8s-op-short| using the
            following ``helm`` command:

            .. code-block:: sh

               helm template helm_chart > operator.yaml
               kubectl apply -f operator.yaml 

            You can customize your Chart before installing it by using
            the ``--set`` option. For this Chart, you may need to add
            one or more of the following options:

            .. include:: /includes/list-tables/k8s-helm-install-options-online.rst

         To troubleshoot your |k8s-op-short|, see
         :ref:`review-k8s-op-logs`.

         .. include:: /includes/admonitions/fact-remove-k8s-resources-first.rst

     - id: helmoffline
       name: Offline using Helm and Docker
       content: |

         To upgrade the |k8s-op-short| on a host not connected to the
         Internet, you have two options, you can download the
         |k8s-op-short| files from either:

         .. tabs::

            tabs:
              - id: internet
                name: The Internet
                content: |

                  2. Upgrade the latest version of the |k8s-op-short|
                     with modified pull policy values using the
                     following ``helm`` command:

                     .. code-block:: sh

                        helm template --set registry.pullPolicy=IfNotPresent \
                          helm_chart > operator.yaml
                        kubectl apply -f operator.yaml 

                     You can further customize your Chart before
                     installing it by using the ``--set`` option. For
                     this Chart, you may need to add one or more of the
                     following options:

                     .. include:: /includes/list-tables/k8s-helm-install-options-offline.rst

                  To troubleshoot your |k8s-op-short|, see
                  :ref:`review-k8s-op-logs`.

                  .. include:: /includes/admonitions/fact-remove-k8s-resources-first.rst

              - id: host
                name: Another Host
                content: |

                  2. Upgrade the latest version of the |k8s-op-short|
                     with modified pull policy values using the
                     following ``helm`` command:

                     .. code-block:: sh

                        helm template --set registry.pullPolicy=IfNotPresent \
                          helm_chart > operator.yaml
                        kubectl apply -f operator.yaml 

                     You can further customize your Chart before
                     installing it by using the ``--set`` option. For
                     this Chart, you may need to add one or more of the
                     following options:

                     .. include:: /includes/list-tables/k8s-helm-install-options-offline.rst
