.. setting:: mms.backup.journal.heads

   *Type*: boolean

   *Default*: False

   
   This sets whether the :opsmgr:`HEAD database </reference/glossary/#term-head-database>` should
   use :term:`journaling <journal>`. See :ref:`manage-backup-jobs` to
   enable or disable journaling for the :opsmgr:`head database </reference/glossary/#term-head-database>` of a
   single backup job.
   
   FCV |fcv-link| ``4.2`` and later use :term:`backup cursors 
   <backup cursor>` instead of :opsmgr:`head databases </reference/glossary/#term-head-database>` 
   for backups.
   
   

