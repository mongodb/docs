.. admonition:: Potential for Production Failure
   :class: warning

   Your |onprem| instance can fail in production if you fail to configure the following:

   - |onprem| hosts per the :doc:`/core/requirements`.

   - MongoDB hosts per the
     :manual:`Production Notes </administration/production-notes>` in
     the MongoDB manual. MongoDB instances in |onprem| include:

     - The |onprem| Application Database,
     - Each |onprem| Backup Daemon :term:`head database`, and
     - Each blockstore.

