The On-Prem MMS app server is horizontally scalable. To take advantage of this
capability, configure each of the MMS servers ``conf-mms.properties`` file to
point their ``mms.centralUrl`` property to a load balancer. Then configure the
load balancer to balance between the pool of MMS app servers.
   
The MMS app servers are stateless between requests. Any app server can handle
requests as long as they read from the same backing MongoDB replica set. Where
multiple MMS app servers are present for high availability, we recommend a
replica set as the backing MongoDB (rather than a stand-alone).
   
Follow these steps for high availability:

1. Configure a load balancer with the pool of MMS app server locations. Because
   load balancers are specific to their environment and can have different
   configurations, we don't have a recommendation for load balancer configurations.

#. Configure the ``mms.centralUrl`` property of each MMS app server's
   ``conf-mms.properties`` file to point to the load balanced URL.

#. Edit the ``conf-mms.properties`` file on each MMS app server to deﬁne the
   replication hosts for the backing MongoDB.

