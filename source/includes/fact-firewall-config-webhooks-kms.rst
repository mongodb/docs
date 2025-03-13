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

.. important::

   The {+atlas-admin-api+} uses the terms ``inbound`` and ``outbound``
   in relation to the control plane, not your network. As a result:
     
   - Your network's **inbound** rules must match the ``outbound``
     CIDRs listed in the {+atlas-admin-api+}.
   - Your network's **outbound** rules must match the ``inbound``
     CIDRs listed in the {+atlas-admin-api+}.

The following diagram shows the relationship between ``inbound`` and
``outbound`` for the control plane and your network:

.. figure:: /images/ControlPlaneInboundVsOutbound.svg
   :figwidth: 650px
   :alt: A diagram showing that inbound traffic for the control plane 
         reflects outbound traffic from your network, and outbound traffic for the 
         control plane reflects inbound traffic to your network.

To add the returned IP addresses to your cloud provider's KMS IP access list, 
see the prerequisites for managing customer keys with :ref:`AWS <aws-ksm-prereqs>`, 
:ref:`Azure <azure-kms-prereqs>`, and :ref:`GCP <gcp-kms-prereqs>`.

.. _atlas-required-outbound-access:

Required Access: ``controlPlane.outbound`` IP Addresses
-------------------------------------------------------

``controlPlane.outbound`` lists the IP addresses traffic coming from the 
control plane. Your network's **inbound** HTTP IP address list must allow 
access from the IP addresses listed in ``controlPlane.outbound``. 

We recommend that you :ref:`use the Atlas Admin API
<atlas-fetch-control-plane-ips>` to fetch the current outbound |service|
control plane IP addresses.

.. _atlas-required-inbound-access:

Required Access: ``controlPlane.inbound`` IP Addresses
-------------------------------------------------------

``controlPlane.inbound`` lists the IP addresses traffic coming into
the control plane. If your network allows **outbound** HTTP requests only to 
specific IP addresses, you must allow access to the IP addresses listed in 
``controlPlane.inbound`` so that |service| can communicate with your webhooks 
and |kms|.

We recommend that you :ref:`use the Atlas Admin API <atlas-fetch-control-plane-ips>`
to fetch the current inbound |service| control plane IP addresses.
