MongoDB does not synchronize a forced replica set reconfiguration
between the replica sets in a cluster. Using ``{ force: true }`` can
lead to a :term:`rollback` of majority-committed writes and an
inconsistent sharded cluster. Exercise caution when you use this option.