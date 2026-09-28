.. warning::

   The :method:`db.collection.renameCollection()` method and
   :dbcommand:`renameCollection` command invalidate open cursors. This creates
   an :ref:`invalidate event <change-event-invalidate>` for any existing
   :ref:`change streams <changeStreams>` opened on the source or target
   collection, and also interrupts queries that are currently returning
   data from the renamed collection.