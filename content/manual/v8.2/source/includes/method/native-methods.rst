.. list-table::
   :widths: 30,70
   :header-rows: 1

   * - Legacy Method Name
     - Replacement

   * - ``cat()``
     - Returns the contents of the specified file
     
       .. code-block:: javascript

          fs.readFileSync( <filename>, 'utf8' )

       The legacy ``useBinaryMode`` option is not supported. Emulate 
       the ``useBinaryMode = false`` option with:
       
       .. code-block:: javascript
       
          fs.readFileSync( <filename>, 'utf8' ).replace( /\r\n/g, '\n' )

   * - ``getHostName()``
     - Returns the hostname of the system running :binary:`mongosh`.

       .. code-block:: javascript

          os.hostname()

   * - ``getMemInfo()``
     - Returns a document that reports memory used by the shell.

       .. code-block:: javascript

          process.memoryUsage()

   * - ``hostname()``
     - Returns the hostname of the computer running the shell.

       .. code-block:: javascript

          os.hostname()

   * - ``isInteractive()``
     - Returns a boolean indicating whether :binary:`~bin.mongosh` is
       running in interactive or script mode.

       .. code-block::

          isInteractive()

   * - ``listFiles()``
     - Returns an array of documents that give the name and type of
       each object in the directory.

       .. code-block:: javascript

          fs.readdirSync( <path>, { withFileTypes: true } )

   * - ``load()``
     - Loads and runs a JavaScript file in the shell.

       ``load()`` is available in :binary:`mongosh`. See also
       :ref:`load-and-require`.

   * - ``ls()``
     - Returns a list of the files in the current directory.

       .. code-block:: javascript

          fs.readdirSync( <path> )

   * - ``md5sumFile()``
     - Returns the :term:`md5` hash of the specified file.

       .. code-block:: javascript

          crypto.createHash( 'md5' ).update( fs.readFileSync( <filename> ) ).digest( 'hex' )

   * - ``mkdir()``
     - Creates a directory at the specified path.

       .. code-block:: javascript

          fs.mkdirSync( <path>, { recursive: true } )

   * - ``quit()``
     - Exits the current shell session.

       .. code-block:: javascript

          quit()
 
   * - ``removeFile()``
     - Removes the specified file from the local file system.

       .. code-block:: javascript

          fs.unlinkSync( <filename> )

   * - ``sleep()``
     - Sleep for the specified number of milliseconds.

       .. code-block:: javascript

          sleep( <number> )

   * - ``version()``
     - Returns the current version of :binary:`~bin.mongosh` instance.

       .. code-block:: javascript

          version()

   * - ``_isWindows()``
     - Returns ``true`` if the shell in running on Windows.

       .. code-block:: javascript
       
          process.platform === 'win32'

   * - ``_rand()``
     - Returns a random number between ``0`` and ``1``.                    
                                                                           
       .. code-block:: javascript                                          
                                                                           
          Math.random() 
