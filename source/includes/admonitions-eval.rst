.. \|object| defined in included parameters-eval ..
.. \|nolockobject| defined in included parameters-eval ..

You must run |object| against the :term:`primary` member of a
replica set. If you attempt to run |object| on a :term:`secondary`
member, MongoDB will return an error.

Write Lock
~~~~~~~~~~

.. include:: /includes/fact-eval-lock.rst

For long running |object| operation, consider using either the
:command:`eval` command with ``nolock: true`` or using :doc:`other
server side code execution options </core/server-side-javascript>`.

Sharded Data
~~~~~~~~~~~~

You can not use |object| with :term:`sharded <sharding>` collections.
In general, you should avoid using |object| in :term:`sharded clusters
<sharded cluster>`; nevertheless, it is possible to use |object| with
non-sharded collections and databases stored in a :term:`sharded
cluster`.

Access Control
~~~~~~~~~~~~~~

.. versionchanged:: 2.6

.. include:: /includes/extracts/access-eval-eval.rst
