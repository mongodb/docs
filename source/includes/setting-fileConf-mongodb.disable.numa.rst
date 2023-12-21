.. setting:: mongodb.disable.numa

   *Type*: boolean

   
   To disable NUMA for the :opsmgr:`head databases </reference/glossary/#std-term-head-database>`,
   follow the :ref:`Modify a Custom Setting <opsmgr-config-add-custom>`
   procedure using the following values:
   
   .. list-table::
      :widths: 20 80
   
      * - :guilabel:`Key`
        - ``mongodb.disable.numa``
      * - :guilabel:`Value`
        - ``true``
   
   To learn more about NUMA, see :ref:`production-numa` in the MongoDB
   Production Notes.
   
   .. important::
   
      Each |mms| instance with Backup Daemons enabled must have the
      ``numactl`` service installed. If ``numactl`` is not installed
      and this setting is set to ``true``, backup jobs fail.
   
      .. include:: /includes/head-database-backup-deprecated.rst
   
   

