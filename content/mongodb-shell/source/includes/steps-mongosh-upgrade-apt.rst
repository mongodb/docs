.. procedure::
    :style: normal

    .. step:: Update package information
    
        .. code-block:: sh

            sudo apt-get update
        
    .. step:: Upgrade the mongosh package

        .. code-block:: sh

            sudo apt-get install --only-upgrade mongodb-mongosh

    .. step:: Verify the installation

        .. include:: /includes/mongosh-verify-build-info.rst
