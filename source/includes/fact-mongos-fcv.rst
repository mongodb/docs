Starting in MongoDB 4.0, the :binary:`~bin.mongos` binary will crash when
attempting to connect to :binary:`~bin.mongod` instances whose
:ref:`feature compatibility version (fCV) <view-fcv>` is greater than
that of the :binary:`~bin.mongos`. For example, you cannot connect
a MongoDB |oldversion| version :binary:`~bin.mongos` to a |newversion|
sharded cluster with :ref:`fCV <view-fcv>` set to |newversion|. You
can, however, connect a MongoDB |oldversion| version
:binary:`~bin.mongos` to a |newversion| sharded cluster with :ref:`fCV
<view-fcv>` set to |oldversion|.

.. Using substitutions, so that the blurb in example is updated per each version of the manual.
