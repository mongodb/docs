=========================================================
Install MongoDB Community on macOS using ``.tgz`` Tarball
=========================================================

.. |arrow| unicode:: U+27A4
.. |edition| replace:: Community
.. |distro-name| replace:: macOS
.. |package-manager| replace:: ``brew``
.. |executable-name| replace:: ``mongod``
.. |mdb-download-link| replace:: `MongoDB Download Center <https://www.mongodb.com/try/download/community>`__

Overview
--------

Use this tutorial to manually install MongoDB {+version+} |edition|
Edition on macOS using a downloaded ``.tgz`` tarball.

MongoDB Version
~~~~~~~~~~~~~~~

.. include:: /includes/fact-install-past-mongodb.rst

Installation Method
~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-use-package-manager.rst

Select **Homebrew** from the :guilabel:`Installation Method` dropdown for instructions.

Considerations
--------------

MongoDB Shell, ``mongosh``
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-have-to-install-mongosh-tgz.rst

Platform Support
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-platform-support-macos.rst

Production Notes
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-see-production-notes.rst

.. _install-with-tarball:

Install MongoDB Community Edition
---------------------------------

To manually install MongoDB |edition| Edition from the ``.tgz``, select the tab 
that corresponds with your Mac's processor and complete the following steps:

.. tabs:: 

   .. tab:: Intel 
      :tabid: intel

      .. procedure:: 
          :style: normal
      
          .. step:: Download the tarball. 
              
              Download the MongoDB |edition| ``tgz`` tarball from the following link: 
              
              |arrow| |mdb-download-link| 
              
              a. In the :guilabel:`Version` dropdown, select the version of MongoDB to download. 
              
              #. In the :guilabel:`Platform` dropdown, select :guilabel:`macOS`. 
          
              #. In the :guilabel:`Package` dropdown, select :guilabel:`tgz`. 
          
              #. Click :guilabel:`Download`.
      
          .. step:: Extract the files from the downloaded archive. 
      
              .. code-block:: sh
      
                  tar -zxvf mongodb-macos-x86_64-{+version+}.tgz
      
              .. include:: /includes/automatically-unzipped-tar-files.rst
      
          .. step:: Ensure the binaries are in a directory listed in your ``PATH`` environment variable.
      
              .. include:: /includes/ensure-binaries-in-path.rst

   .. tab:: Apple Silicon
      :tabid: apple

      .. procedure:: 
          :style: normal
      
          .. step:: Download the tarball. 
      
              Download the MongoDB |edition| ``tgz`` tarball from the following link: 
              
              |arrow| |mdb-download-link| 
              
              a. In the :guilabel:`Version` dropdown, select the version of MongoDB to download. 
              
              #. In the :guilabel:`Platform` dropdown, select :guilabel:`macOS ARM 64`. 
              
              #. In the :guilabel:`Package` dropdown, select :guilabel:`tgz`. 
              
              #. Click :guilabel:`Download`.
      
          .. step:: Extract the files from the downloaded archive. 
      
              .. code-block:: sh
      
                  tar -zxvf mongodb-macos-arm64-{+version+}.tgz
      
              .. include:: /includes/automatically-unzipped-tar-files.rst
      
          .. step:: Ensure the binaries are in a directory listed in your ``PATH`` environment variable.
      
              .. include:: /includes/ensure-binaries-in-path.rst

Run MongoDB Community Edition
-----------------------------

ulimit Considerations
   .. include:: /includes/fact-installation-ulimit.rst

Procedure
~~~~~~~~~

Follow these steps to run MongoDB |edition| Edition. These instructions
assume that you are using the default settings.

.. include:: /includes/deploy/install-tar.rst

Additional Information
----------------------

Localhost Binding by Default
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-installation-bind-ip-default-in-config.rst
