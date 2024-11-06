
.. procedure:: 
   :style: normal 

   .. step:: Install the dependencies.

      a. Install the :ref:`{+atlas-cli+} <install-atlas-cli>`.

         If you use `Homebrew <https://brew.sh/#install>`__, you can
         run the following command in your terminal:

         .. code-block::

            brew install mongodb-atlas-cli
               
         For installation instructions on other operating systems,
         see :ref:`install-atlas-cli`.

      #. Install `Docker <https://www.docker.com/>`__.

         Docker requires a network connection for pulling and caching 
         MongoDB images.

         - For MacOS or Windows, install `Docker Desktop v4.31+ <https://docs.docker.com/desktop/release-notes/#4310>`__. 
         - For Linux, install `Docker Engine v27.0+ <https://docs.docker.com/engine/release-notes/27.0/>`__.
         - For Linux RHEL, you can also use `Podman v5.0+ <https://podman.io>`__.

      #. (Optional) Install :mongosh:`mongosh </install>` version 2.0 or later.

         .. code-block:: sh

            brew install mongosh

         For installation instructions on other operating 
         systems, see :mongosh:`Install mongosh </install>`.
         
      #. (Optional) Install :compass:`Compass </install>` version 1.39.4 or later.

         .. code-block:: sh

            brew install mongodb-compass

         For installation instructions on other operating 
         systems, see :compass:`Download and Install Compass </install>`.
          
   .. step:: Create an |service| account.

      If you don't already have an existing |service| account, run ``atlas setup`` in your terminal
      or `create a new account <https://account.mongodb.com/account/register?tck=docs_atlas>`__.
