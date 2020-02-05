The following steps depend on how your environment is configured:

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

                          .. include:: /includes/steps/upgrade-kubectl.rst

                      - id: helmonlinek8sup
                        name: Online using Helm
                        content: |

                          .. _upgrade-k8s-operator-helm:

                          .. include:: /includes/steps/upgrade-k8s-online-helm.rst

                      - id: helmofflinek8sup
                        name: Offline using Helm and Docker
                        content: |

                          To upgrade the |k8s-op-short| on a host not connected to the
                          Internet, you have two options, you can download the
                          |k8s-op-short| files from either:

                          .. note that these tabs contain the same content but I don't think that's intended. separated the includes out to prepare for corrections.

                          .. tabs::

                              tabs:
                                - id: internetk8up
                                  name: The Internet
                                  content: |

                                    .. include:: /includes/steps/upgrade-k8s-offline-helm-internet.rst


                                - id: hostk8sup
                                  name: Another Host
                                  content: |

                                    .. include:: /includes/steps/upgrade-k8s-offline-helm-host.rst

        - id: osup
          name: OpenShift
          content: |

              .. tabs::

                    tabs:
                      - id: ocup
                        name: Online using oc
                        content: |

                          .. _upgrade-k8s-operator-oc:

                          .. include:: /includes/steps/upgrade-oc.rst


                      - id: helmonlineosup
                        name: Online using Helm
                        content: |

                          .. _upgrade-operator-helm-oc:

                          .. include:: /includes/steps/upgrade-os-online-helm.rst

                      - id: helmofflineosup
                        name: Offline using Helm and Docker
                        content: |

                          .. note that these tabs contain the same content but I don't think that's intended. separated the includes out to prepare for corrections.

                          To upgrade the |k8s-op-short| on a host not connected to the
                          Internet, you have two options, you can download the
                          |k8s-op-short| files from either:

                          .. tabs::

                              tabs:
                                - id: internetosup
                                  name: The Internet
                                  content: |

                                    .. include:: /includes/steps/upgrade-os-offline-helm-internet.rst

                                - id: hostosup
                                  name: Another Host
                                  content: |

                                    .. include:: /includes/steps/upgrade-os-offline-helm-host.rst

.. include:: /includes/troubleshoot-k8s.rst