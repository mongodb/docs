.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the |driver-link| driver, install version |driver-version|.

   .. step:: Install libmongocrypt {+minimum-libmongocrypt-version+} or later

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Suse:

      a. Import the public key used to sign the package repositories

         .. code-block:: sh

            sudo rpm --import https://pgp.mongodb.com/libmongocrypt.asc

      #. Add the repository to your package sources

         .. important::

            Change ``<release>`` in the following shell command to your platform release (e.g. "12" or "15").

         .. code-block:: sh

            sudo zypper addrepo --gpgcheck "https://libmongocrypt.s3.amazonaws.com/zypper/suse/<release>/libmongocrypt/{+libmongocrypt-version+}/x86_64" libmongocrypt

      #. Install the ``libmongocrypt`` package

         .. code-block:: sh

            sudo zypper -n install libmongocrypt

   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      .. include:: /includes/see-get-started.rst