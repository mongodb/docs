.. _mongodb-10.2.12.5930:

MongoDB Agent 10.2.12.5930
--------------------------

:ref:`Released with Ops Manager 4.2.7 on 2020-01-09 <opsmgr-server-4.2.7>`

- Improves the behavior when a rollback occurs on a source cluster
  using replication protocol v0 when backing up clusters running
  MongoDB 4.0 and earlier.

.. _mongodb-10.2.11.5927:

MongoDB Agent 10.2.11.5927
--------------------------

:ref:`Released with Ops Manager 4.2.6 on 2019-12-19 <opsmgr-server-4.2.6>`

- Resolves memory leak in MongoDB Agent when performing snapshots for
  MongoDB 4.2 clusters.

.. _mongodb-10.2.10.5921:

MongoDB Agent 10.2.10.5921
--------------------------

:ref:`Released with Ops Manager 4.2.5 on 2019-12-12 <opsmgr-server-4.2.5>`

- MongoDB Agent is now built using Go 1.13.

.. _mongodb-10.2.9.5909:

MongoDB Agent 10.2.9.5909
-------------------------

:ref:`Released with Ops Manager 4.2.4 on 2019-11-07 <opsmgr-server-4.2.4>`

- MongoDB Agent is now built using Go 1.13.
- Fixes an issue where the MongoDB Agent fails to complete some
  requested actions on a sharded cluster if a config server is down.
- When creating an index using :doc:`Data Explorer </data-explorer>`,
  the optional name property of an index is no longer ignored.

.. _mongodb-10.2.8.5901-1:

MongoDB Agent 10.2.8.5901-1
---------------------------

:ref:`Released with Ops Manager 4.2.3 on 2019-10-10 <opsmgr-server-4.2.3>`

- Fixes an issue where upgrading to
  :ref:`MongoDB Agent 10.2.7 <mongodb-10.2.7.5898>` from any previous
  version restarted all |mongos| processes.

.. _mongodb-10.2.7.5898:

MongoDB Agent 10.2.7.5898
-------------------------

:ref:`Released with Ops Manager 4.2.2 on 2019-10-03 <opsmgr-server-4.2.2>`

- Adds support for the ``businessCategory`` field in extended
  validation |tls| certificates.
- MongoDB Agent is now built using Go 1.12.
- Adds support for the
  :xml:`<mono><ref target="index-type-partial">partialFilterExpression</ref></mono>`
  index option when creating an index using
  :doc:`Data Explorer </data-explorer>`.
- **Backup:** Adds support for the ``businessCategory`` field in
  extended validation |tls| certificates.
- **Monitoring:** Adds support for the ``businessCategory`` field in
  extended validation |tls| certificates.

.. _mongodb-10.2.6.5879-1:

MongoDB Agent 10.2.6.5879-1
---------------------------

:ref:`Released with Ops Manager 4.2.1 on 2019-09-05 <opsmgr-server-4.2.1>`

- Fixes a bug where the MongoDB Agent could panic and delete files from
  its current working directory.
- Improves logging in the MongoDB Agent such that when a connection to
  a MongoDB process is deliberately canceled, it does not appear as an
  error.

