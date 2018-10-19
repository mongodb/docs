The following are required to begin building |compass| plugins:

- |compass| (version 1.11 or greater)
- Node Version Manager (NVM)
- NodeJS
- Khaos

The following procedure outlines how to install these dependencies:

1. Install the latest version of |compass| for your operating system
   from the
   `MongoDB Download Center <https://www.mongodb.com/download-center/compass>`__.

2. Install the `Node Version Manager (NVM) <https://github.com/creationix/nvm>`__:

   For MacOS and Linux operating systems:
     Follow the installation instructions at
     `<https://github.com/creationix/nvm#install-script>`_.

   For Windows operating systems:
     a. Download the ``nvm-setup.zip`` file from
        `<https://github.com/coreybutler/nvm-windows/releases>`_.

     b. Decompress the downloaded .zip file and run ``nvm-setup.exe``.

3. Install `NodeJS <https://nodejs.org/en/>`_ via NVM:

   .. code-block:: sh

      nvm install stable

4. Install the `Khaos <http://khaos.io/>`__ templating engine:

   .. code-block:: sh

      npm install -g khaos

5. Create the |compass| plugins directory. Compass looks for plugins in this
   directory:

   |compass|
     .. code-block:: sh

        mkdir -p ~/.mongodb/compass/plugins

   |compass| Community Edition
     .. code-block:: sh

        mkdir -p ~/.mongodb/compass-community/plugins
