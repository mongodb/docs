.. admonition:: Potential for Production Failure
   :class: warning

   Your |onprem| instance can fail in production if you fail to configure the following:

   - |onprem| hosts per the :doc:`/core/requirements`.

   - MongoDB hosts per the
     :manual:`Production Notes </administration/production-notes>` in
     the MongoDB manual. MongoDB instances in |onprem| include:

     - The |onprem| Application Database,
     - Each blockstore.
     - Each |onprem| Backup Daemon :term:`head database`. This only
       applies to FCV 4.0 and earlier. FCV 4.2 and later do not use
       :term:`head databases <head database>` for backups.
