.. warning::

   - The :method:`rs.reconfig()` shell method can force the current
     primary to step down, which causes an :ref:`election
     <replica-set-elections>`. When the primary steps down, the
     :binary:`~bin.mongod` closes all client connections. While this
     typically takes 10-20 seconds, try to make these changes during
     scheduled maintenance periods.

   - .. include:: /includes/warning-mixed-version-rs-config.rst
