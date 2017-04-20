+++
title = "Replace a Config Server"

[tags]
mongodb = "product"
+++

Important: In version 3.4, MongoDB removes support for SCCC config servers. To upgrade your config servers from SCCC to CSRS, see [Upgrade Config Servers to Replica Set](#).The following procedure applies to 3.4 config servers.For replacing config servers for other MongoDB versions, refer to the appropriate version of the MongoDB Manual. For example, if you are running a v3.2 sharded cluster with SCCC, see the following tutorials in the v3.2 manual: [/tutorial/migrate-config-servers-with-same-hostname](https://docs.mongodb.com/v3.2/tutorial/migrate-config-servers-with-same-hostname) and [/tutorial/migrate-config-servers-with-different-hostnames](https://docs.mongodb.com/v3.2/tutorial/migrate-config-servers-with-different-hostnames) 


## Overview

If the config server replica set becomes read only, i.e. does not
have a primary, the sharded cluster cannot support operations that change
the cluster metadata, such as chunk splits and migrations. Although no
chunks can be split or migrated, applications will be able to write data
to the sharded cluster.

If one of the config servers is unavailable or inoperable, repair or
replace it as soon as possible. The following procedure replaces a member
of a [config server replica set](#sharding-config-server) with a new
member.

The tutorial is specific to MongoDB 3.4. For earlier versions of
MongoDB, refer to the corresponding version of the MongoDB Manual.


## Considerations

The following restrictions apply to a replica set configuration when used
for config servers:

* Must have zero [arbiters](#). 

* Must have no [delayed members](#). 

* Must build indexes (i.e. no member should have ``buildIndexes`` setting set to false). 


## Procedure


### Step 1: Start the replacement config server.

Start a [``mongod``](#bin.mongod) instance, specifying both the ``--configsvr``
and ``--replSet`` options.

```sh

mongod --configsvr --replSet <replicaSetName>

```


### Step 2: Add the new config server to the replica set.

Connect a [``mongo``](#bin.mongo) shell to the primary of the config server
replica set and use [``rs.add()``](#rs.add) to add the new member.

```javascript

rs.add("<hostnameNew>:<portNew>")

```

The initial sync process copies all the data from one member of the
config server replica set to the new member without restarting.

[``mongos``](#bin.mongos) instances automatically recognize the change in the
config server replica set members without restarting.


### Step 3: Shut down the member to replace.

If replacing the primary member, step down the primary first before
shutting down.


### Step 4: Remove the member to replace from the config server replica set.

Upon completion of initial sync of the replacement config server,
from a [``mongo``](#bin.mongo) shell connected to the primary, use
[``rs.remove()``](#rs.remove) to remove the old member.

```javascript

rs.remove("<hostnameOld>:<portOld>")

```

[``mongos``](#bin.mongos) instances automatically recognize the change in the
config server replica set members without restarting.


### Step 5: If necessary, update ``mongos`` configuration or DNS entry.

With replica set config servers, the [``mongos``](#bin.mongos) instances specify
in the [``--configdb``](#cmdoption-configdb) or [``sharding.configDB``](#sharding.configDB) setting the config
server replica set name and at least one of the replica set members.

As such, if the [``mongos``](#bin.mongos) instance does not specify the
removed replica set member in the [``--configdb``](#cmdoption-configdb) or
[``sharding.configDB``](#sharding.configDB) setting, no further action is necessary.

If, however, a [``mongos``](#bin.mongos) instance specified the removed
member in the ``--configdb`` or [``configDB``](#sharding.configDB)
setting, either:

* Update the setting for the next time you restart the [``mongos``](#bin.mongos), or 

* Modify the DNS entry that points to the system that provided the old config server, so that the *same* hostname points to the new config server. 
