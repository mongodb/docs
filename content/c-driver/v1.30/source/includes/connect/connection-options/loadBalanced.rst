Specifies whether the driver is connecting to a load balancer. You can set this
property to ``true`` only if all the following conditions are met:

- You specify just one host name
- You're not connecting to a replica set
- You're not using the ``SrvMaxHosts`` property
- You're not using the ``DirectConnection`` property

The default value is ``false``.