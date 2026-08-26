The ``$source`` stage synchronizes existing documents in
``customers`` and ``accounts``, in that order, then opens a change
stream scoped to both collections:

- ``coll: ["customers", "accounts"]`` sets the sync scope to both
  collections instead of one.

- ``initialSync: { enable: true }`` turns on the sync phase before
  {+atlas-sp+} starts tailing the change stream.

- ``fullDocument: "required"`` includes the current version of the
  document in every change event.
