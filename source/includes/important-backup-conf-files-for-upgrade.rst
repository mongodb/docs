.. warning::

   To maintain existing settings and availability, back up the following 
   in your current |onprem| instance: 
   
   - ``conf-mms.properties`` and ``gen.key`` files to a 
     secure location. The ``conf-mms.properties`` stores settings
     for the |onprem| instance. The :ref:`gen.key <gen-key>` 
     provides details to encrypt and decrypt |onprem|\s
     backing databases and user credentials. |onprem| might delete 
     these files as part of the upgrade process.
   - :term:`Application Database`. If the upgrade fails, you need a
     :doc:`current backup </tutorial/backup-the-backup-service/>`
     to restore your |onprem| instance. Use |mongodump| to back up
     your :term:`Application Database`.
