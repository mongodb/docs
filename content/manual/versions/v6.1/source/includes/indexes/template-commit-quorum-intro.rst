To set the :ref:`commit quorum <createIndexes-cmd-commitQuorum>`, use
|updateMethod-name| to specify the ``commitQuorum`` value.

``commitQuorum`` specifies how many data-bearing voting members, or
which voting members, including the primary, must be prepared to commit
the index build before the primary will execute the commit. The default
commit quorum is ``votingMembers``, which means all data-bearing
members.
