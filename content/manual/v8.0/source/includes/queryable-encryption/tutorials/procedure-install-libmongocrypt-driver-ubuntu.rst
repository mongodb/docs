.. procedure::

   .. step:: Install a compatible driver version
            
      To use {+qe+} with the |driver-link| driver, install version |driver-version|.

   .. step:: Install libmongocrypt {+minimum-libmongocrypt-version+} or later

      .. include:: /includes/queryable-encryption/tutorials/warning-dont-build-libmongocrypt-from-source.rst

      To install on Ubuntu:

      a. Configure the repository

         .. note::

            If you are using the `extrepo <https://manpages.ubuntu.com/manpages/focal/man1/extrepo.1p.html>`__ 
            repository manager, you can view and enable the ``libmongocrypt``
            repository by running the commands:

            .. code-block:: sh

               extrepo search libmongocrypt
               sudo extrepo enable libmongocrypt
   
         To configure the repository manually:
   
         i. Import the public key used to sign the package repositories:

            .. code-block:: sh

               sudo sh -c 'curl -s --location https://pgp.mongodb.com/libmongocrypt.asc
               | gpg --dearmor >/etc/apt/trusted.gpg.d/libmongocrypt.gpg'
      
         #. Add the MongoDB repository to your package sources:

            .. important::

               Change ``<release>`` in the following shell command to your platform release (for example "xenial" or "buster").

            .. code-block:: sh

               echo "deb https://libmongocrypt.s3.amazonaws.com/apt/ubuntu <release>/libmongocrypt/{+libmongocrypt-version+} universe" | sudo tee /etc/apt/sources.list.d/libmongocrypt.list

      #. Update the package cache

         .. code-block:: sh

            sudo apt-get update


      #. Install ``libmongocrypt``

         .. code-block:: sh

            sudo apt-get install -y libmongocrypt-dev

   .. step:: Start a MongoDB Atlas Cluster or Enterprise instance.

      .. include:: /includes/see-get-started.rst