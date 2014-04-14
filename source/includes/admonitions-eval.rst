.. warning::

   .. \|object| defined in included parameters-eval ..
   .. \|nolockobject| defined in included parameters-eval ..

   - .. include:: /includes/fact-eval-lock.rst

   - Do not use |object| for long running operations as
     |object| blocks all other operations. Consider using
     :doc:`other server side code execution options
     </core/server-side-javascript>`.

   - You can not use |object| with :term:`sharded
     <sharding>` data. In general, you should avoid using
     |object| in :term:`sharded cluster`; nevertheless, it
     is possible to use |object| with non-sharded
     collections and databases stored in a :term:`sharded cluster`.

   - .. include:: /includes/fact-eval-authentication.rst

.. versionchanged:: 2.4
   The V8 JavaScript engine, which became the default in 2.4, allows
   multiple JavaScript operations to execute at the same time. Prior to
   2.4, |object| executed in a single thread.
