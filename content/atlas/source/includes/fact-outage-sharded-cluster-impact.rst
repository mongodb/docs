A regional outage or regional outage simulation that affects the
highest priority regions in a sharded {+cluster+} could cause the
{+cluster+} to become inoperable for read operations. To restore the config
servers, do the following:

- Configure a :manual:`read preference </core/read-preference/>` that is
  suitable for querying secondary nodes for reads. 
- :ref:`Reconfigure <reconfigure-rs-during-regional-outage>` the
  {+cluster+} for regaining electable nodes. 
