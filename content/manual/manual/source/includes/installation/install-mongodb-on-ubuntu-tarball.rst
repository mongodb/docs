======================================================
Install MongoDB Community on Ubuntu using .tgz Tarball
======================================================

.. |arrow| unicode:: U+27A4
.. |edition| replace:: Community
.. |package-name| replace:: ``{+package-name-org+}``
.. |distro-name| replace:: Ubuntu
.. |package-manager| replace:: ``apt``
.. |executable-name| replace:: ``mongod``
.. |mdb-download-link| replace:: `MongoDB Download Center <https://www.mongodb.com/try/download/community>`__

Overview
--------

Use this tutorial to manually install MongoDB {+version+} |edition|
Edition on LTS (long-term support) releases of Ubuntu Linux using a
downloaded ``.tgz`` tarball.

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

.. include:: /includes/fact-platform-support-ubuntu.rst

Production Notes
~~~~~~~~~~~~~~~~

.. include:: /includes/fact-see-production-notes.rst

Install MongoDB Community Edition
---------------------------------

Prerequisites
~~~~~~~~~~~~~

.. include:: /includes/fact-tarball-dependencies.rst

.. tabs::

   .. tab:: Ubuntu 24.04 (Noble)
      :tabid: noble

      .. include:: /includes/extracts/install-mongodb-community-manually-ubuntu-24.rst

   .. tab:: Ubuntu 22.04 (Jammy)
      :tabid: ubuntu-22-jammy

      .. include:: /includes/extracts/install-mongodb-community-manually-ubuntu-22.rst

   .. tab:: Ubuntu 20.04 (Focal)
      :tabid: ubuntu-20-focal

      .. include:: /includes/extracts/install-mongodb-community-manually-ubuntu-20.rst

Procedure
~~~~~~~~~

Follow these steps to manually install MongoDB |edition| Edition from
the ``.tgz``.

.. include:: /includes/steps/install-mongodb-on-ubuntu-tarball.rst

Run MongoDB Community Edition
-----------------------------

ulimit Considerations
~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/fact-installation-ulimit.rst

.. |mongod-user| replace:: ``mongodb``
.. |mongod-datadir| replace:: ``/var/lib/mongodb``

Configuration
~~~~~~~~~~~~~

You can configure the MongoDB instance (such as the
data directory and log directory specifications) using
either the command-line options or a :ref:`configuration file
<conf-file>`.

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
