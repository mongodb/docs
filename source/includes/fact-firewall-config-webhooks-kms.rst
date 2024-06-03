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

.. this list encompasses lb-f in us-east-1 (cloud.mongodb.com), and lb-e in all regions (backup/restore) 
   to generate from chef, run the following query:
   knife search '(role:lb-f AND domain:us-east-1.aws.cloud.10gen.cc) OR (role:lb-e)' -f "ip=cloud.public_ipv4_addrs" |sort |uniq |cut -d: -f2

Inbound access is traffic coming into the |service| control plane. If
your network allows outbound HTTP requests only to specific IP
addresses, you must allow access from the following IP addresses so that
|service| can communicate with your webhooks and |kms|:

.. code-block:: none
   
   100.20.244.132
   100.21.69.82
   13.41.37.227
   18.132.228.73
   18.133.128.29
   18.159.125.67
   18.159.172.186
   18.232.30.107
   18.235.209.93
   3.104.40.37
   3.214.160.189
   3.93.83.52
   3.94.56.171
   34.194.131.15
   34.194.251.66
   34.195.194.204
   34.195.55.18
   34.200.195.130
   34.203.104.26
   34.227.138.166
   34.230.213.36
   34.240.63.74
   44.211.4.85
   44.216.169.184
   44.224.106.250
   52.27.78.36
   52.62.201.169
   52.86.156.12
   54.147.76.65
   54.204.237.208
   54.229.218.76
   54.253.166.79
   54.74.18.76
   54.93.136.153
