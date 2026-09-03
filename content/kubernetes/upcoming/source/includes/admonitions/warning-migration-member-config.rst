.. warning:: Set ``spec.memberConfig`` before you raise the member count

   By default, new Kubernetes members join as voting members. The
   CRD defaults are ``votes: 1`` and ``priority: "1"``, which let a
   still-syncing member participate in an election before it has
   finished its initial sync.

   MongoDB recommends that you write one ``spec.memberConfig`` entry
   per new Kubernetes member with ``votes: 0`` and ``priority: "0"``
   before you raise the member count, so that a still-syncing member
   cannot win an election. ``votes`` is an integer. ``priority`` is
   a string.
