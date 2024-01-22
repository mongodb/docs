.. setting:: mongodb.release.autoDownload

   *Type*: boolean

   *Default*: True

   
   Flag indicating whether the Backup Daemons automatically install the
   versions of MongoDB that the Backup Daemons need.
   
   .. list-table::
      :widths: 10 90
   
      * - ``true``
        - The daemons retrieve the binaries from MongoDB Inc. over the
          internet.
   
      * - ``false``
        - Backup Daemons do not have internet access and require that an
          |onprem| administrator manually download and extract every
          archived version of a MongoDB release that the backup daemons
          need. The administrator must place the extracted binaries into
          the :setting:`Versions Directory` on the |onprem| hosts.
   
   .. warning::
    
      Set to ``false`` when |onprem| is running in
      :doc:`Local Mode </tutorial/configure-local-mode>`.
   
   Corresponds to :setting:`Backup Versions Auto Download`.
   

