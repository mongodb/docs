During deployment of an ``M10+`` dedicated paid cluster, |service| 
creates a |vpc| for the selected provider and region or regions if no 
existing |vpc| or |vpc| peering connection exists for that provider and 
region. |service| assigns the |vpc| a |cidr| block. 

If you want to create a |vpc| peering connection *and* require a 
specific |cidr| block for a given region, you must create a
|vpc| connection *before* deploying the cluster.
See :doc:`/security-vpc-peering` for complete documentation on
|vpc| peering connections.

For clusters deployed on |gcp|, if your application requres |service| to
use a |cidr| block smaller than ``/18``, you must create a network
peering container using the |service| :ref:`API 
<atlas-create-peering-container-api>` *before* deploying the cluster.
For this |service| project, you can deploy clusters on |gcp| only to the
regions you specify when you created the network peering container that
uses a |cidr| smaller than ``/18``.

.. important::

   Multi-region clusters require one |vpc| peering connection for each 
   region. MongoDB nodes can use only the peering connection that 
   resides in the same region as the nodes to communicate with the 
   peered |vpc|.
