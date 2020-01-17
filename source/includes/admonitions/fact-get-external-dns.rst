.. tip::

   To obtain the external :abbr:`DNS (Domain Name System)` of your
   Kubernetes cluster, you can run the following command:

   .. code-block:: sh

      kubectl describe nodes

   This command displays the external DNS in the
   ``Addresses.ExternalDNS`` section of the output.

   Alternatively, you can output the external DNS directly by running:

   .. code-block:: sh

      kubectl get nodes -o jsonpath='{ $.items[*].status.addresses[?(@.type=="ExternalDNS")].address }'
