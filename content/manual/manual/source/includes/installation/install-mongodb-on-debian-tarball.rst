======================================================
Install MongoDB Community on Debian using .tgz Tarball
======================================================

.. |arrow| unicode:: U+27A4
.. |edition| replace:: Community
.. |package-name| replace:: ``{+package-name-org+}``
.. |distro-name| replace:: Debian
.. |package-manager| replace:: ``apt``
.. |executable-name| replace:: ``mongod``
.. |mdb-download-link| replace:: `MongoDB Download Center <https://www.mongodb.com/try/download/community>`__

Overview
--------

Use this tutorial to manually install MongoDB {+version+} |edition|
Edition on Debian Linux using a downloaded ``.tgz`` tarball.

MongoDB Version
~~~~~~~~~~~~~~~

.. include:: /includes/fact-install-past-mongodb.rst

Installation Method
~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-use-package-manager.rst

|arrow| See :ref:`Install MongoDB using the apt Package Manager<install-mdb-community-debian>`
for instructions.

Considerations
--------------

MongoDB Shell, ``mongosh``
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-have-to-install-mongosh-tgz.rst

Platform Support
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-platform-support-debian.rst

Production Notes
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-see-production-notes.rst

.. _install-community-debian-from-tarball:

Install MongoDB Community Edition
---------------------------------

Prerequisites
~~~~~~~~~~~~~

.. include:: /includes/fact-tarball-dependencies.rst

.. include:: /includes/extracts/install-mongodb-community-manually-debian-12.rst

Procedure
~~~~~~~~~

Follow these steps to manually install MongoDB |edition| Edition from
the ``.tgz``.

.. include:: /includes/steps/install-mongodb-on-linux.rst

Run MongoDB Community Edition
-----------------------------

ulimit Considerations
~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-installation-ulimit.rst

.. |mongod-user| replace:: ``mongodb``
.. |mongod-datadir| replace:: ``/var/lib/mongodb``

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
