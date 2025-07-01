.. setting:: Installer Download Source

   *Type*: string

   *Default*: :guilabel:`remote`

   
   You need to select the :guilabel:`Source for agents to download 
   MongoDB binaries:`
   
   .. list-table::
      :widths: 30 70
   
      * - :guilabel:`remote`
        - All Agents and |onprem| hosts download MongoDB 
          binaries from a remote source in the background. An internet 
          connection is required on all hosts.
   
          You can specify the remote source for downloading MongoDB 
          binaries with the :setting:`Base URL` field. If you don't, 
          :guilabel:`Base URL` defaults to the remote URLs for downloading
          MongoDB binaries as listed in the :ref:`Network Requirements <network-requirements>`.
   
      * - :guilabel:`hybrid`
        - Agents get MongoDB binaries from |onprem|, which fetches 
          binaries from a remote source.
   
          You can specify the remote source for downloading MongoDB 
          binaries with the :setting:`Base URL` field. If you don't, 
          :guilabel:`Base URL` defaults to the remote URLs for downloading
          MongoDB binaries as listed in the :ref:`Network Requirements <network-requirements>`.
   
      * - :guilabel:`local`
        - Agents get MongoDB binaries from |onprem|, which has them 
          on disk.
   
          An |onprem| administrator must 
          :doc:`provide installers </tutorial/configure-local-mode>`
          from the :dl:`MongoDB Download Center <ops-manager>` and upload them
          into the :setting:`Versions Directory`. |onprem| serves
          the installers to Agent hosts. The Version Manifest
          must be 
          :doc:`updated manually </tutorial/update-version-manifest>`.
          No hosts in the deployment require an internet connection.
   
   Corresponds to :setting:`automation.versions.source`.
   

