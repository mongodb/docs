Before you begin, complete the following prerequisites:

.. important::

   For compatibility information on each product in the 
   dependencies list, see the product's installation documentation.

- Install the :ref:`{+atlas-cli+} <install-atlas-cli>`.

  **Example (MacOS):**

  .. code-block:: sh

     brew install mongodb-atlas-cli

  To learn about the {+atlas-cli+} install instructions for other 
  operating systems, see :ref:`install-atlas-cli`.

- Install :mongosh:`mongosh </install>` version 2.0 or later.

  **Example (MacOS):**

  .. code-block:: sh

     brew install mongosh

  To learn about the {+mongosh+} install instructions for other 
  operating systems, see :mongosh:`Install mongosh </install>`.

- (Optional) Install :compass:`Compass </install>` version 1.39.4 or 
  later.

  **Example (MacOS):**

  .. code-block:: sh

     brew install mongodb-compass

  To learn about the Compass install instructions for other operating 
  systems, see :compass:`Download and Install Compass </install>`.

- Install :dbtools:`MongoDB Database Tools 	
  </installation/installation/>`.	

  **Example (MacOS):**	

  .. code-block:: sh	

     brew tap mongodb/brew && brew install mongodb-database-tools

  To learn about the MongoDB Database Tools install instructions for 
  other operating systems, see :dbtools:`Installing the Database Tools 
  </installation/installation/>`.

- Install `Docker <https://www.docker.com//>`__.

  - For MacOS or Windows, install `Docker Desktop v4.31+ <https://docs.docker.com/desktop/release-notes/#4310>`__. 
  - For Linux, install `Docker Engine v27.0+ <https://docs.docker.com/engine/release-notes/27.0/>`__. 

  .. note::

     Docker requires a network connection for pulling and caching 
     MongoDB images.

     `Podman v5.0+ <https://podman.io>`__ is also supported for Linux RHEL versions.  
