If you use ``$lookup`` in a view definition, you can only perform a
cross-database join if your foreign collection is one of the following
namespaces:

- ``{ db: "config", coll: "collections" }``
- ``{ db: "config", coll: "chunks.*" }``
- ``{ db: "local", coll: "oplog.rs" }``