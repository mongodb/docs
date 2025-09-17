.. meta::
   :description: Install MongoDB Community Edition on Windows using a zip file.

==========================================================
Install MongoDB Community on Windows using the Zip File
==========================================================

.. |arrow| unicode:: U+27A4
.. |edition| replace:: Community
.. |distro-name| replace:: Windows
.. |executable-name| replace:: ``mongod.exe``
.. |mdb-download-link| replace:: `MongoDB Download Center <https://www.mongodb.com/try/download/community?tck=docs_server>`__

Overview
--------

Use this tutorial to install MongoDB Community on Windows by downloading and 
extracting the zip file.

MongoDB Version
~~~~~~~~~~~~~~~

.. include:: /includes/fact-install-past-mongodb.rst

Installation Method
~~~~~~~~~~~~~~~~~~~

This tutorial installs MongoDB on Windows by extracting from a zip file. You can 
also install MongoDB on Windows by these other methods:

- :ref:`Install MongoDB using msiexec.exe <install-mdb-community-windows-msiexec>`

- :ref:`Install MongoDB using the MSI Installer <install-mdb-community-windows>`


Considerations
--------------

MongoDB Shell, ``mongosh``
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-have-to-install-mongosh-win.rst

Platform Support
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-platform-support-windows.rst

Virtualization
~~~~~~~~~~~~~~

.. include:: /includes/fact-virtualbox-not-supported.rst

Production Notes
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-see-production-notes.rst

Full Time Diagnostic Data Capture
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB logs diagnostic data to assist with troubleshooting. For
detailed information, see :ref:`Full Time Diagnostic Data Capture <ftdc-stub>`.

.. include:: /includes/fact-ftdc-windows-user-permissions.rst

Install MongoDB Community Edition
----------------------------------

Procedure
~~~~~~~~~

Follow these steps to install MongoDB |edition| Edition from the zip file.

.. include:: /includes/steps/install-mongodb-on-windows-zip.rst

Start MongoDB Community Edition from the Command Interpreter
------------------------------------------------------------

.. include:: /includes/start-community-from-cmd.rst

Run MongoDB Community Edition as a Windows Service
--------------------------------------------------

.. include:: /includes/community-as-service-on-windows.rst

Additional Considerations
-------------------------

.. include:: /includes/community-on-windows-considerations.rst