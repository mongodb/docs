.. procedure::
    :style: normal

    .. step:: Download the tarball.

        .. include:: /includes/macos-install-download-tarball-apple-silicon.rst

    .. step:: Extract the files from the downloaded archive.

        .. code-block:: sh

            tar -zxvf mongodb-macos-arm64-enterprise-{+version+}.tgz

        .. include:: /includes/automatically-unzipped-tar-files.rst

    .. step:: Ensure the binaries are in a directory listed in your ``PATH`` environment variable.

        .. include:: /includes/ensure-binaries-in-path.rst
