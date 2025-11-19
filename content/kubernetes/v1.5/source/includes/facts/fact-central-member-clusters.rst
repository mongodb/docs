A |multi-cluster| that uses the |k8s-op-full| consists of one
**operator cluster** and one or more **member clusters** in |k8s|:

- The **operator cluster** has the following role:

  - Hosts the |k8s-op-full|
  - Acts as the control plane for the |multi-cluster|
  - Hosts the |mongodb-multi| spec for the MongoDB replica set
  - Can also host |onprem|, if you deploy |onprem| with the |k8s-op-short|
  - Can also host members of the MongoDB replica set

  .. important::

     The operator cluster is also known as the operator cluster.
     References to the operator cluster might be renamed to refer to the operator cluster in the future releases.

- **Member clusters** have the following roles:
- Host the MongoDB replica sets
- Can also host |onprem|, if you deploy |onprem| with the |k8s-op-short|
