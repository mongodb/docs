1. Change to the directory in which you cloned the |k8s-op-short|
   repository. The following steps depend on how your environment is
   configured:

   .. tabs::

      tabs: 
        - id: vank8sup
          name: Kubernetes
          content: |

              .. tabs::

                    tabs:
                      - id: kubectlup
                        name: Online using kubectl
                        content: |

                          .. _upgrade-k8s-operator-kubectl:

                          2. Upgrade the |k8s-crds| for MongoDB deployments 
                             using the following |kubectl| command:

                             .. code-block:: sh

                                kubectl apply -f crds.yaml

                          #. You can edit the Operator |yaml| file to 
                             further customize
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

                      - id: helmonlinek8sup
                        name: Online using Helm
                        content: |

                          .. _upgrade-k8s-operator-helm:

                          2. Upgrade the latest version of the 
                             |k8s-op-short| using the
                             following ``helm`` command:

                             .. code-block:: sh

                                helm template helm_chart > operator.yaml \
                                -- values helm_chart/values.yaml
                                kubectl apply -f operator.yaml

                             .. include:: /includes/helm-install-k8s-options.rst

                             .. note:: 

                                You can also pass these values as options 
                                when you apply the Helm Chart:

                                .. code-block:: sh
                                    
                                   helm template --set namespace=<testNamespace> \
                                   helm_chart > operator.yaml
                                   kubectl apply -f operator.yaml

                      - id: helmofflinek8sup
                        name: Offline using Helm and Docker
                        content: |

                          To upgrade the |k8s-op-short| on a host not connected to the
                          Internet, you have two options, you can download the
                          |k8s-op-short| files from either:

                          .. tabs::

                              tabs:
                                - id: internetk8up
                                  name: The Internet
                                  content: |

                                    2. Upgrade the latest version of the |k8s-op-short|
                                       with modified pull policy values using the
                                       following ``helm`` command:

                                       .. code-block:: sh

                                          helm template --set registry.pullPolicy=IfNotPresent \
                                          helm_chart > operator.yaml \
                                          -- values helm_chart/values.yaml
                                          kubectl apply -f operator.yaml 

                                       .. include:: /includes/helm-install-k8s-options.rst

                                       .. note::
                                       
                                          You can also pass these values as options when you apply the Helm
                                          Chart:

                                          .. code-block:: sh

                                             helm template --set registry.pullPolicy=IfNotPresent \
                                             --set namespace=<testNamespace> \
                                             helm_chart > operator.yaml \
                                             -- values helm_chart/values.yaml
                                             kubectl apply -f operator.yaml

                                - id: hostk8sup
                                  name: Another Host
                                  content: |

                                    2. Upgrade the latest version of the |k8s-op-short|
                                       with modified pull policy values using the
                                       following ``helm`` command:

                                       .. code-block:: sh

                                          helm template --set registry.pullPolicy=IfNotPresent \
                                          helm_chart > operator.yaml \
                                          -- values helm_chart/values.yaml
                                          kubectl apply -f operator.yaml 

                                       .. include:: /includes/helm-install-k8s-options.rst

                                       .. note::
                                       
                                          You can also pass these values as options when you apply the Helm
                                          Chart:

                                          .. code-block:: sh

                                             helm template --set registry.pullPolicy=IfNotPresent \
                                             --set namespace=<testNamespace> \
                                             helm_chart > operator.yaml \
                                             -- values helm_chart/values.yaml
                                             kubectl apply -f operator.yaml

        - id: osup
          name: OpenShift
          content: |

              .. tabs::

                    tabs:
                      - id: ocup
                        name: Online using oc
                        content: |

                          .. _upgrade-k8s-operator-oc:

                          2. Upgrade the |k8s-crds| for MongoDB deployments 
                             using the following |kubectl| command:

                             .. code-block:: sh

                                oc apply -f crds.yaml

                          #. You can edit the Operator |yaml| file to 
                             further customize
                             your Operator before upgrading it.

                             a. Open your ``mongodb-enterprise-openshift.yaml`` in   
                                your preferred text editor.

                             #. You may need to add one or more of the following
                                options:

                                .. include:: /includes/list-tables/k8s-oc-install-options.rst

                                .. note::

                                   Any values enclosed in single or double quotes
                                   *require* those quotes. Include the quotes when
                                   setting these values.

                          #. Upgrade the |k8s-op-short| using the following
                             |oc| command:

                             .. code-block:: sh

                                oc apply -f mongodb-enterprise-openshift.yaml


                      - id: helmonlineosup
                        name: Online using Helm
                        content: |

                          .. _upgrade-operator-helm-oc:

                          2. Upgrade the latest version of the 
                             |k8s-op-short| using the
                             following ``helm`` command:

                             .. code-block:: sh

                                helm template helm_chart > operator.yaml \
                                -- values helm_chart/values-openshift.yaml
                                kubectl apply -f operator.yaml

                             .. include:: /includes/helm-install-os-options.rst

                             .. note:: 

                                You can also pass these values as options 
                                when you apply the Helm Chart:

                                .. code-block:: sh
                                    
                                   helm template --set namespace=<testNamespace> \
                                   helm_chart > operator.yaml \
                                   -- values helm_chart/values-openshift.yaml
                                   kubectl apply -f operator.yaml

                      - id: helmofflineosup
                        name: Offline using Helm and Docker
                        content: |

                          To upgrade the |k8s-op-short| on a host not connected to the
                          Internet, you have two options, you can download the
                          |k8s-op-short| files from either:

                          .. tabs::

                              tabs:
                                - id: internetosup
                                  name: The Internet
                                  content: |

                                    2. Upgrade the latest version of the |k8s-op-short|
                                       with modified pull policy values using the
                                       following ``helm`` command:

                                       .. code-block:: sh

                                          helm template --set registry.pullPolicy=IfNotPresent \
                                          helm_chart > operator.yaml \
                                          -- values helm_chart/values-openshift.yaml
                                          kubectl apply -f operator.yaml 

                                       .. include:: /includes/helm-install-os-options.rst

                                       .. note::
                                       
                                          You can also pass these values as options when you apply the Helm
                                          Chart:

                                          .. code-block:: sh

                                             helm template --set registry.pullPolicy=IfNotPresent \
                                             --set namespace=<testNamespace> \
                                             helm_chart > operator.yaml \
                                             -- values helm_chart/values-openshift.yaml
                                             kubectl apply -f operator.yaml

                                - id: hostosup
                                  name: Another Host
                                  content: |

                                    2. Upgrade the latest version of the |k8s-op-short|
                                       with modified pull policy values using the
                                       following ``helm`` command:

                                       .. code-block:: sh

                                          helm template --set registry.pullPolicy=IfNotPresent \
                                          helm_chart > operator.yaml \
                                          -- values helm_chart/values-openshift.yaml
                                          kubectl apply -f operator.yaml 

                                       .. include:: /includes/helm-install-os-options.rst

                                       .. note::
                                           
                                          You can also pass these values as options when you apply the Helm
                                          Chart:

                                          .. code-block:: sh

                                             helm template --set registry.pullPolicy=IfNotPresent \
                                             --set namespace=<testNamespace> \
                                             helm_chart > operator.yaml \
                                             -- values helm_chart/values-openshift.yaml
                                             kubectl apply -f operator.yaml

.. include:: /includes/troubleshoot-k8s.rst