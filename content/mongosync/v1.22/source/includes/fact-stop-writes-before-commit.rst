.. warning::

   To reliably stop writes before you commit the migration, you must:

   - Use :writeconcern:`"majority"` write concern for all application
     writes to the synced collections on the source cluster throughout
     the migration.
   - Shut down all writers to the synced collections cleanly.

   Otherwise, writes can be applied after the cutover starts.

   - If a write is applied while the cutover is in progress,
     ``mongosync`` detects the write. The migration fails
     permanently, and you must redo it.
   - If writes are applied after the cutover completes, ``mongosync``
     does not detect them. These writes are lost, and the migration
     silently corrupts your data.
