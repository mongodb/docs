.. versionchanged:: 2.0
   MongoDB 2.0 added :method:`db.fsyncLock()` and
   :method:`db.fsyncUnlock()` helpers to the :program:`mongo`
   shell.  Prior to this version, use the :dbcommand:`fsync`
   command with the ``lock`` option, as follows:

.. code-block:: javascript

   db.runCommand( { fsync: 1, lock: true } );
   db.runCommand( { fsync: 1, lock: false } );
