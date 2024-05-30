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

.. include:: /includes/fact-inbound-ip-addresses.rst

Send a GET request to the ``controlPlaneIPAddresses`` endpoint 
to fetch the current |service| control plane IP addresses. The :oas-atlas-op:`API endpoint </returnAllControlPlaneIPAddresses>` 
returns a list of inbound and outbound |service| control plane IP addresses in |cidr| notation 
categorized by cloud provider and region, similar to the following:

.. code-block:: json

   {
     "controlPlane": {
       "inbound": {
         "aws": { // cloud provider
           "us-east-1": [ // region
             "3.92.113.229/32",
             "3.208.110.31/32",
             "107.22.44.69/32"
             ...,
           ],
           ...
          }
        },
        "outbound": {
          "aws": { // cloud provider
            "us-east-1": [ // region
              "3.92.113.229/32",
              "3.208.110.31/32",
              "107.22.44.69/32"
              ...,
            ],
            ...
           }
         }
     },
     "data_federation": {
       "inbound": {},
       "outbound" {}
     },
     "app_services": {
       "inbound": {},
       "outbound" {}
     },
     ...
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
addresses, you must allow access from the following IP addresses so that
|service| can communicate with your webhooks and |kms|:

.. code-block:: none

   3.92.113.229
   3.208.110.31
   3.211.96.35
   3.212.79.116
   3.214.203.147
   3.215.10.168
   3.215.143.88
   3.232.182.22
   18.214.178.145
   18.235.30.157
   18.235.48.235
   18.235.145.62
   34.193.91.42
   34.193.242.51
   34.194.7.70
   34.196.80.204
   34.196.151.229
   34.200.66.236
   34.235.52.68
   34.236.228.98
   34.237.40.31
   34.238.35.12
   35.153.40.82
   35.169.184.216
   35.171.106.60
   35.173.54.44
   35.174.179.65
   35.174.230.146
   35.175.93.3
   35.175.94.38
   35.175.95.59
   44.206.200.18
   44.207.9.197
   44.207.12.57
   50.19.91.100
   52.7.232.43
   52.71.233.234
   52.73.214.87
   52.87.98.128
   52.203.106.167
   54.145.247.111
   54.163.55.77
   54.167.217.16
   100.26.2.217
   107.20.0.247
   107.20.107.166
   107.22.44.69
