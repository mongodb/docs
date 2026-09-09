- Keep at least 3 voting members at all times. |k8s-op-short|
  rejects more than 7 voting members. If you exceed 7, add
  non-voting Kubernetes members or remove voting external members.

- Make only one kind of change at a time: add Kubernetes members,
  prune external members, or change the votes and priority of only
  one member at a time. Admission validation rejects mixed changes
  once migration has started, and also rejects removing Kubernetes
  members or adding external members mid-migration.

- Act only when the deployment is at goal state.

- Migrate the primary last. Shifting votes and priority onto a
  member can trigger an election, and writes can briefly fail
  while the replica set elects a new primary. Migrating the
  primary last avoids triggering that election, and the write
  downtime it causes, until the final step.

  .. note::

     You can also trigger a re-election by increasing the priority
     of a member in Kubernetes.

- While ``spec.externalMembers`` is non-empty, |k8s-op-short|
  forces one-member-at-a-time scaling. This is why each change
  needs its own wait for goal state.
