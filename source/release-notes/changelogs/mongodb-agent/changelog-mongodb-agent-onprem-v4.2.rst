.. _mongodb-10.2.6.5879-1:

MongoDB Agent 10.2.6.5879-1
---------------------------

:ref:`Released with Ops Manager 4.2.1 on 2019-09-05 <opsmgr-server-4.2.1>`

- Fixes a bug where the MongoDB Agent could panic and delete files from
  its current working directory.
- Improves logging in the MongoDB Agent such that when a connection to
  a MongoDB process is deliberately canceled, it does not appear as an
  error.

