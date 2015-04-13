The default :setting:`storage.wiredTiger.engineConfig.cacheSizeGB` setting
assumes that there is a single :program:`mongod` instance per node. If a single
node contains multiple instances, then you should adjust the
:setting:`storage.wiredTiger.engineConfig.cacheSizeGB` setting to accommodate the
working set as well as the other :program:`mongod` instances.

If you run :program:`mongod` in a container (e.g. ``lxc``, ``cgroups``,
Docker, etc.) that does *not* have access to all of the RAM available
in a system, you must set the
:setting:`storage.wiredTiger.engineConfig.cacheSizeGB` to a value less than the
amount of RAM available in the container. The exact amount depends on
the other processes running in the container.
