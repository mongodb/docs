.. include:: /includes/install-helm-gh.rst

To install the |k8s-op-short| on a host not connected to the Internet,
choose to download its files from:

.. tabs::

    hidden: true

    tabs:
      - id: internetos
        name: The Internet
        content: |

          .. include:: /includes/steps/install-os-offline-helm-internet.rst

      - id: hostos
        name: Another Host
        content: |

          .. include:: /includes/steps/install-os-offline-helm-host.rst
