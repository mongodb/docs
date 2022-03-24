# Renaming a Cluster

Currently, you're not able to easily rename a cluster, 
however you could deploy a new cluster with the same properties and only change the name.

**Note:** this won't migrate any data of the old cluster to the new cluster.

One way to do this with the cli could be:

```bash
mongocli atlas cluster describe oldName --output json  > oldcluster.json
mongocli atlas cluster create newName --file oldcluster.json
mongocli atlas cluster delete oldName --force
```

In case that **zsh** is available to you can even use the following utilities: 

```zsh
# ZSH only
(TMPSUFFIX=.json; mongocli atlas clusters create newName -f =(mongocli atlas clusters describe oldName -o json))
mongocli atlas cluster delete oldName --force
```
