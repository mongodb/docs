The ``mongosync`` binary is in the ``dist/`` directory of the
unpacked tarball. To add the location of the ``mongosync`` binary to
your ``PATH``, do one of the following:

- Copy the binary into a directory listed in your ``PATH``
  variable, such as ``/usr/local/bin``. (Update
  ``/path/to/mongosync/dist`` to reflect the location where you
  extracted the ``tar`` file.)

  .. code-block:: bash

     sudo cp /path/to/mongosync/dist/mongosync /usr/local/bin/

- Create symbolic links to the ``mongosync`` binary from a
  directory such as ``/usr/local/bin`` that is already in your
  ``PATH``. (Update ``/path/to/mongosync/dist`` to reflect the
  location where you extracted the ``tar`` file.)

  .. code-block:: bash

      sudo ln -s  /path/to/mongosync/dist/mongosync /usr/local/bin/mongosync


