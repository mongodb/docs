.. Install MongoDB Enterprise on Windows (msiexec)
.. procedure::
   :style: normal

   .. step:: Download the installer.

      .. include:: /includes/deploy/windows-wizard-download.rst

   .. step:: Run the Installer from the Windows Command Interpreter.

      .. important::
 
         You must open the command interpreter as an
         :guilabel:`Administrator`.
 
      Use the ``.msi`` installer to install all MongoDB binaries, including
      `MongoDB Compass <https:///www.mongodb.com/products/compass>`__.

      From the Command Interpreter, go to the directory containing the
      ``.msi`` installation binary and run:

      .. include:: /includes/release/install-ent-windows-default.rst

      The operation installs the binaries to the default directory
      ``C:\Program Files\MongoDB\Server\{+version+}\bin``.
    
      To specify a different installation location for the executables,
      add the ``INSTALLLOCATION`` value.
    
      .. include:: /includes/release/install-ent-windows-addlocation.rst
 
      To suppress the installation of :ref:`MongoDB
      Compass <compass-index>`, you must explicitly include the
      ``SHOULD_INSTALL_COMPASS="0"`` argument.
    
      .. include:: /includes/release/install-ent-windows-nocompass.rst
 
      To install specific MongoDB component sets, you can specify them in
      the ``ADDLOCAL`` argument using a comma-separated list including one
      or more of the following component sets:
    
      .. list-table::
          :header-rows: 1
          :widths: 20 80
    
          * - Component Set Name
            - Binaries Included in the Component Set
    
          * - ``ServerNoService``
            - :binary:`mongod.exe`
    
          * - ``ServerService``
            - Set up :binary:`mongod.exe` as a Windows service.
    
          * - ``Router``
            - :binary:`mongos.exe`
          * - ``MonitoringTools``
            - :binary:`mongostat.exe <bin.mongostat>`,
              :binary:`mongotop.exe <bin.mongotop>`
          * - ``ImportExportTools``
            - :binary:`mongodump.exe <bin.mongodump>`,
              :binary:`mongorestore.exe <bin.mongorestore>`,
              :binary:`mongoexport.exe <bin.mongoexport>`,
              :binary:`mongoimport.exe <bin.mongoimport>`
          * - ``MiscellaneousTools``
            - ``mongodecrypt.exe``,
              :binary:`mongokerberos.exe <mongokerberos>`,
              :binary:`mongoldap.exe <mongoldap>`
    
      For example, to install the MongoDB server
      (:binary:`mongod.exe`) with the legacy ``mongo``
      client and then set up the MongoDB server as a Windows service,
      run:
    
      .. include:: /includes/release/install-ent-windows-service.rst
 
      To include Compass in the installs, remove ``SHOULD_INSTALL_COMPASS="0"``.
   
  
