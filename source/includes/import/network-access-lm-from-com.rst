Network Access for Live Migrating from Ops Manager or Cloud Manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Contact your |com| service administrator and obtain
external IP addresses for the following components:

External IP Address of the Source Cluster in Ops Manager
````````````````````````````````````````````````````````

If you are migrating from |onprem|, the Live Migration service
in |service| requires an external IP address or an external |cidr|
block of the |onprem| instance in the source cluster deployment.
This address could be from a single |onprem| instance, or, if the source
deployment uses multiple |onprem| instances, from the gateway
the |onprem| instances will use to reach |service|.

The Live Migration service uses this external IP address when
generating a :term:`link-token`. A link-token is a string that
contains the information necessary to connect from |com| to |service|
during a Live Migration from a |com| deployment to a cluster in |service|.

External IP Address of the Migration Host in Ops Manager or Cloud Manager
`````````````````````````````````````````````````````````````````````````

Before you begin the Live Migration procedure, add the IP addresses or
|cidr| blocks of your migration hosts to the project
:doc:`IP access list </security/ip-access-list>`. |service| allows
connections to the target cluster only from hosts with entries in the
project's access list.


