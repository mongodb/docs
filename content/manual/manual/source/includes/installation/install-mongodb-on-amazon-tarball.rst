============================================================
Install MongoDB Community on Amazon Linux using .tgz Tarball
============================================================

.. |arrow| unicode:: U+27A4
.. |edition| replace:: Community
.. |package-name| replace:: ``{+package-name-org+}``
.. |distro-name| replace:: Amazon
.. |package-manager| replace:: ``yum``
.. |executable-name| replace:: ``mongod``
.. |mdb-download-link| replace:: `MongoDB Download Center <https://www.mongodb.com/try/download/community>`__

Overview
--------

Use this tutorial to manually install MongoDB {+version+} |edition|
Edition on Amazon Linux using a downloaded ``.tgz`` tarball.

Verify Linux Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-check-amazon-linux-community.rst

MongoDB Version
~~~~~~~~~~~~~~~

.. include:: /includes/fact-install-past-mongodb.rst

Installation Method
~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-use-package-manager.rst

Select **Package Manager** from the :guilabel:`Package` dropdown for instructions.

Considerations
--------------

MongoDB Shell, ``mongosh``
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-have-to-install-mongosh-tgz.rst

Platform Support
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-platform-support-amazon.rst

Production Notes
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-see-production-notes.rst

Install MongoDB Community Edition
---------------------------------

Prerequisites
~~~~~~~~~~~~~

.. include:: /includes/fact-tarball-dependencies.rst

.. include:: /includes/extracts/install-mongodb-community-manually-redhat.rst

Procedure
~~~~~~~~~

Follow these steps to manually install MongoDB |edition| Edition from
the ``.tgz``.

.. include:: /includes/steps/install-mongodb-on-amazon-tarball.rst

Run MongoDB Community Edition
-----------------------------

ulimit Considerations
~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-installation-ulimit.rst

.. |mongod-user| replace:: ``mongod``
.. |mongod-datadir| replace:: ``/var/lib/mongo``

Directories
~~~~~~~~~~~

.. include:: /includes/fact-installation-directories.rst

Procedure
~~~~~~~~~

Follow these steps to run MongoDB |edition| Edition. These instructions
assume that you are using the default settings.

.. include:: /includes/steps/run-mongodb-on-linux-tarball.rst

Additional Information
----------------------

Localhost Binding by Default
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-installation-bind-ip-default-in-config.rst
