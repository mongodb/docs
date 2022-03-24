# Creating a Sharded Cluster

To create a sharded cluster you'll need to define a configuration file that includes
a list of shards, each one with their list of process, 
a configuration replica set, also with its list of process
and finally a list of mongos process definitions.

The included [sharded-cluster.json](examples/ops-manager/sharded-cluster.json),
defines a sharded cluster with two shards, each as a three members replica set
and a single mongos. This file can be modified according to your needs and applied using:

```bash
mongocli om clusters create -f sharded-cluster.json --projectId <myProjectID>
```
