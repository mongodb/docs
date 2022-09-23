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

Required Outbound Access
------------------------

If your network allows outbound HTTP requests only to specific IP
addresses, you must allow access to the following IP addresses so that
your API requests can reach the |service| control plane:

.. code-block:: none

   3.214.160.189
   13.248.140.125
   13.248.203.97
   13.248.214.115
   18.210.185.2
   18.210.245.203
   18.232.30.107
   18.235.209.93
   34.192.82.120
   34.194.131.15
   34.194.251.66
   34.195.194.204
   34.227.138.166
   34.230.213.36
   34.233.152.179
   34.233.179.140
   35.172.148.213
   35.172.245.18
   54.147.76.65
   54.204.237.208
   75.2.1.110
   76.223.14.2
   76.223.77.37
   76.223.84.31
   99.83.223.45

Required Inbound Access
-----------------------

If your network allows inbound HTTP requests only from specific IP
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

