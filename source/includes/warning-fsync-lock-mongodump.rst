.. warning::

   .. versionchanged:: 2.2
      When used in combination with :dbcommand:`fsync` or
      :method:`db.fsyncLock()`, :binary:`~bin.mongod` may block some
      reads, including those from :binary:`~bin.mongodump`, when
      queued write operation waits behind the :dbcommand:`fsync`
      lock.
