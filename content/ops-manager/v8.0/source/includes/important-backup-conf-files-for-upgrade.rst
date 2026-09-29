.. warning::

   To maintain existing settings and availability, back up the 
   following in your current |onprem| instance: 
   
   - ``conf-mms.properties`` and ``gen.key`` files to a 
     secure location. The ``conf-mms.properties`` stores settings
     for the |onprem| instance. The :ref:`gen.key <gen-key>` 
     provides details to encrypt and decrypt |onprem|\s
     backing databases and user credentials. |onprem| might delete 
     these files as part of the upgrade process.

   As an extra precaution, you may use |mongodump| to create a binary 
   export of the :opsmgr:`Application Database 
   </reference/glossary/#std-term-application-database>`. No officially 
   supported backup method exists for the Application Database. If the 
   upgrade fails, reach out to |mdb-support| for help fixing the 
   issue with the {+onprem+} version.
