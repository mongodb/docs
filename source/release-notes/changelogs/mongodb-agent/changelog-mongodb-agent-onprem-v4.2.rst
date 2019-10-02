.. _mongodb-10.2.7.5898:

MongoDB Agent 10.2.7.5898
-------------------------

:ref:`Released with Ops Manager 4.2.2 on 2019-10-03 <opsmgr-server-4.2.2>`

- Adds support for the ``businessCategory`` field in extended validation
  SSL certificates.
- MongoDB Agent is now built using Go 1.12.
- Adds support for the
  :xml:`<mono><ref target="index-type-partial">partialFilterExpression</ref></mono>`
  index option when creating an index using
  :doc:`Data Explorer </data-explorer>`.
- **Backup:** Adds support for the ``businessCategory`` field in extended
  validation SSL certificates.
- **Monitoring:** Adds support for the ``businessCategory`` field in extended
  validation SSL certificates.

.. _mongodb-10.2.6.5879-1:

MongoDB Agent 10.2.6.5879-1
---------------------------

:ref:`Released with Ops Manager 4.2.1 on 2019-09-05 <opsmgr-server-4.2.1>`

- Fixes a bug where the MongoDB Agent could panic and delete files from
  its current working directory.
- Improves logging in the MongoDB Agent such that when a connection to
  a MongoDB process is deliberately canceled, it does not appear as an
  error.

