.. step:: Import the public key used to sign the package repositories

   .. code-block:: sh

      sudo sh -c 'curl -s --location https://pgp.mongodb.com/libmongocrypt.asc | gpg --dearmor >/etc/apt/trusted.gpg.d/libmongocrypt.gpg'

.. step:: Add the MongoDB repository to your package sources

   .. important::

      Change ``<release>`` in the following shell command to your platform release (e.g. "xenial" or "buster").

   .. code-block:: sh

      echo "deb https://libmongocrypt.s3.amazonaws.com/apt/ubuntu <release>/libmongocrypt/{+libmongocrypt-version+} universe" | sudo tee /etc/apt/sources.list.d/libmongocrypt.list

.. step:: Update the package cache

   .. code-block:: sh

      sudo apt-get update


.. step:: Install ``libmongocrypt``

   .. code-block:: sh

      sudo apt-get install -y libmongocrypt-dev