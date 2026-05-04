.. step:: Import the public key used to sign the package repositories

   .. code-block:: sh

      sudo rpm --import https://pgp.mongodb.com/libmongocrypt.asc

.. step:: Add the repository to your package sources

   .. important::

      Change ``<release>`` in the following shell command to your platform release (e.g. "12" or "15").

   .. code-block:: sh

      sudo zypper addrepo --gpgcheck "https://libmongocrypt.s3.amazonaws.com/zypper/suse/<release>/libmongocrypt/{+libmongocrypt-version+}/x86_64" libmongocrypt

.. step:: Install the ``libmongocrypt`` package

   .. code-block:: sh

      sudo zypper -n install libmongocrypt