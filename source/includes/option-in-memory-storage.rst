.. versionadded:: 3.4
   You can set the :guilabel:`engine` option to ``inMemory`` to use an
   in-memory storage engine in your deployment. For more information,
   see :manual:`In-Memory Storage Engine </core/inmemory>` in the
   MongoDB manual.

.. important::
   All members of a replica set do not need to use the same storage
   engine. You can deploy a replica set with members that use a mix of
   storage engines, including the :manual:`in-memory storage engine
   </core/inmemory>`. If a member using an in-memory storage engine
   fails or is shut down, it loses *all* of its data. When that member
   is restarted, it needs to :ref:`resychronize all of the data
   <replica-set-initial-sync>` from another member.