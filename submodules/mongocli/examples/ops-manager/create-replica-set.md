# Creating a Replica Set Cluster

To create a replica set cluster you'll need to define a list of process.

The included [replica-set.json](examples/ops-manager/replica-set.json),
defines a replica set with three members.
This file can be modified according to your needs and applied using:

```bash
mongocli om clusters create -f replica-set.json --projectId <myProjectID>
```
