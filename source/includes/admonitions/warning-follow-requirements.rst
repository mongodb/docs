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
<<<<<<< HEAD
=======
  
   Additionally, connecting too many hosts to a single project may cause performance 
   exceptions. Consult the :doc:`core/requirements/#onprem-hardware-requirements` and 
   the :doc:`core/requirements/#onprem-application-database-hardware-requirements` for best performance. 
>>>>>>> 64b0dc7cb ((DOCSP-28651) added a warning about too many hosts per project w a small change)
