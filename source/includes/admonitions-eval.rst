.. \|object| defined in included parameters-eval ..
.. \|nolockobject| defined in included parameters-eval ..

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

.. include:: /includes/access-eval.rst

JavaScript Engine
~~~~~~~~~~~~~~~~~

.. versionchanged:: 2.4

The V8 JavaScript engine, which became the default in 2.4, allows
multiple JavaScript operations to execute at the same time. Prior to
2.4, |object| executed in a single thread.
