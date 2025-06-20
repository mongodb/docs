Before you begin, complete the following prerequisites:

.. important::

   For compatibility information for each prerequisite product, see the 
   related installation pages.

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

- Install `Podman <https://podman.io/>`__ version 4.4 and later.

  **Example (MacOS):**

  .. code-block:: sh

     brew install podman

  .. note::

     Podman requires a network connection for pulling and caching 
     MongoDB images.
