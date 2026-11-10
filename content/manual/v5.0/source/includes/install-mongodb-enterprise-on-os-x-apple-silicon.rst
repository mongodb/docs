.. procedure::
    :style: normal

    .. step:: Download the tarball.

        Download the MongoDB |edition| ``tgz`` tarball from the following link: 
        
        |arrow| |mdb-download-link| 
        
        a. In the :guilabel:`Version` dropdown, select the version of MongoDB 
           to download. 
        
        #. In the :guilabel:`Platform` dropdown, select :guilabel:`macOS ARM 64`. 
        
        #. In the :guilabel:`Package` dropdown, select :guilabel:`tgz`. 
        
        #. Click :guilabel:`Download`.

    .. step:: Extract the files from the downloaded archive.

        .. code-block:: sh

            tar -zxvf mongodb-macos-arm64-enterprise-{+version+}.tgz

        .. include:: /includes/automatically-unzipped-tar-files.rst

    .. step:: Ensure the binaries are in a directory listed in your ``PATH`` environment variable.

        .. include:: /includes/ensure-binaries-in-path.rst
