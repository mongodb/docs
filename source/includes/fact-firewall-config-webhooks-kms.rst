If you use any of the following |service| features, you might have to
add |service| IP addresses to your network's IP access list:

- :ref:`Alert Webhooks <third-party-integrations>`
- :ref:`security-kms-encryption`

  .. note:: 

     If you enable the :ref:`Encryption at Rest <scale-cluster-enable-encryption>`
     feature, you must allow access from public IPs for all your hosts
     in your deployment, including :ref:`CSRS (Config Server Replica
     Sets) <replset-config-servers>` if you are using :term:`sharded
     clusters <sharded cluster>`.

.. _atlas-fetch-control-plane-ips:

Fetch |service| Control Plane IP Addresses
-------------------------------------------

Send a GET request to the ``controlPlaneIPAddresses`` endpoint 
to fetch the current |service| control plane IP addresses. The
:oas-atlas-op:`API endpoint </returnAllControlPlaneIpAddresses>` 
returns a list of inbound and outbound |service| control plane IP
addresses in |cidr| notation categorized by cloud provider and region,
similar to the following: 

.. code-block:: json

   {
     "inbound":{
       "aws":{
         "<region-name>":["<IP-address>", ...],
         ...
       },
       "azure":{
         "<region-name>":["<IP-address>", ...],
         ...
       },"gcp":{
         "<region-name>":["<IP-address>", ...]
         ...
       }
     },
     "outbound":{
       "aws":{
         "<region-name>":["<IP-address>", ...],
         ...
       },
       "azure":{
         "<region-name>":["<IP-address>", ...],
         ...
       },
       "gcp":{
         "<region-name>":["<IP-address>", ...],
         ...
       }
     }
   }

To add the returned IP addresses to your cloud provider's KMS IP access list, 
see the prerequisites for managing customer keys with :ref:`AWS <aws-ksm-prereqs>`, 
:ref:`Azure <azure-kms-prereqs>`, and :ref:`GCP <gcp-kms-prereqs>`.

.. _atlas-required-outbound-access:

Required Outbound Access
------------------------

Outbound access is traffic coming from the |service| control plane. We
recommend that you :ref:`use the Atlas Admin API
<atlas-fetch-control-plane-ips>` to fetch the current outbound |service|
control plane IP addresses.

.. _atlas-required-inbound-access:

Required Inbound Access
-----------------------

Inbound access is traffic coming into the |service| control plane. If
your network allows outbound HTTP requests only to specific IP
addresses, you must allow access from the inbound IP addresses so that
|service| can communicate with your webhooks and |kms|. We recommend
that you :ref:`use the Atlas Admin API <atlas-fetch-control-plane-ips>`
to fetch the current inbound |service| control plane IP addresses.
