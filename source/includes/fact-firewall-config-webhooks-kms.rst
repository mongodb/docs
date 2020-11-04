.. _atlas-add-inbound-ips:

Allow Access to or from the |service| Control Pane
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you use any of the following |service| features, you might have to
add |service| IP addresses to your network's IP access list:

- :ref:`Alert Webhooks <third-party-integrations>`
- :ref:`security-kms-encryption`

Required Outbound Access
````````````````````````

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
   34.194.251.66
   34.230.213.36
   18.210.185.2
   34.192.82.120
   18.210.245.203
   18.235.209.93
   34.227.138.166
   54.204.237.208
   18.232.30.107
   34.233.179.140
   34.233.152.179
   35.172.148.213
   35.172.245.18
   34.192.82.120
   34.233.152.179
   34.233.179.140
   35.172.148.213
   35.172.245.18
   75.2.1.110
   76.223.14.2
   76.223.77.37
   76.223.84.31
   99.83.223.45

Required Inbound Access
```````````````````````

If your network allows inbound HTTP requests only from specific IP
addresses, you must allow access from the following IP addresses so that
|service| can communicate with your webhooks and |kms|:

.. code-block:: none

   18.214.178.145
   18.235.145.62
   18.235.30.157
   18.235.48.235
   34.193.242.51
   34.196.151.229
   34.200.66.236
   34.235.52.68
   35.153.40.82
   35.169.184.216
   35.171.106.60
   35.174.179.65
   35.174.230.146
   35.175.93.3
   35.175.94.38
   35.175.95.59
   52.71.233.234
   52.87.98.128
   107.20.0.247
   107.20.107.166
