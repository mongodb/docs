A |multi-cluster| that uses the |k8s-op-full| consists of one
**central cluster** and one or more **member clusters** in |k8s|:

- The **central cluster** has the following role:

  - Hosts the |k8s-op-full|
  - Acts as the control plane for the |multi-cluster|
  - Hosts the |mongodb-multi| spec for the MongoDB replica set
  - Hosts |onprem|, if you deploy |onprem| with the |k8s-op-short|
  - Can also host members of the MongoDB replica set

- **Member clusters** host the MongoDB replica sets.
