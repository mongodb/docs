.. _release-version-numbers:

==================
MongoDB Versioning
==================

.. meta::
   :description: Understand MongoDB's versioning system, including Major, Minor, and Patch Releases, and their support for Atlas and on-premises deployments.

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

.. important:: 

   Always upgrade to the latest stable patch release of your release series.

MongoDB versioning has the form ``X.Y.Z`` where ``X.Y`` refers to the
release series and ``Z`` refers to the patch number.

Starting with MongoDB 8.2, MongoDB adopts a new versioning and release
strategy to simplify upgrade paths and provide clearer versioning
options. MongoDB is released as two different release series:

- |lts| Releases
- Minor Releases

.. _major-releases:

|lts| Releases
--------------

|lts| Releases are made available approximately once a year, and
introduce new features and improvements. |lts| Releases are supported
for MongoDB Atlas and on-premises deployments.

*Example versions:*

- ``7.0``
- ``8.0``

.. _rapid-releases:
.. _minor-releases:

Minor Releases
---------------------

Minor releases introduce incremental improvements and new features
within a major version release cycle. They are as stable as major
releases and suitable for production workloads.

Starting with MongoDB 8.2, minor releases will also be available for
on-premises deployments (Community and EA) for specific use cases,
such as Search, Vector Search, and enhanced Queryable Encryption
capabilities.

*Example versions:*

- ``8.2``

.. note::

   For the 8.0 release cycle, MongoDB 8.2 is available for both Atlas and on-premises deployments. 
   In MongoDB Atlas, 8.2 is supported until the next minor release.

Release Options for MongoDB Atlas
---------------------------------

Starting with MongoDB 8.2, two release options are available for
Atlas Dedicated clusters:

- |lts| Versions: You can choose to stay on a specific major version
  such as MongoDB 8.0. Clusters on major versions receive bug fixes
  and security patches. You must manually upgrade clusters before
  their End of Life (EOL). Otherwise, Atlas automatically upgrades
  clusters to the latest supported major version after EOL.
- Latest Version with Auto-Upgrade: If you set your cluster to this
  release option, it receives automatic upgrades to the latest available
  MongoDB version and enables new features.

  To learn more about manually upgrading your Atlas cluster, 
  see :ref:`Upgrade a Cluster to a New MongoDB Version <upgrade-major-MongoDB-version>`.

.. note::

   You cannot choose a release option for clusters on the Free and Flex
   tiers as these clusters are automatically upgraded.

.. _versions-patch-release:

Patch Releases
--------------

Patch Releases are made available as needed to both |lts| Releases and
Minor Releases. Patch releases generally include bug fixes and minor
improvements.

*Example versions:*

- ``8.0.1`` (a |lts| Release patch version)
- ``8.2.1`` (a Minor Release patch version)

Release Candidate (RC) Releases
-------------------------------

In advance of new |lts| Releases and Minor Releases, Release
Candidates are made available for early testing. A Release Candidate
represents a version of the upcoming release that is stable enough to
use for testing, but is not suitable for production deployment.

*Example versions:*

- ``6.0.0-rc0``
- ``6.0.0-rc1``
- ``6.1.2-rc5``

Driver Versions
---------------

The version numbering system for MongoDB differs from the system
used for the :ecosystem:`MongoDB drivers </drivers>`.

MongoDB Shell (``mongosh``)
---------------------------

The :mongosh:`MongoDB Shell </>` (``mongosh``) is released separately 
from the MongoDB Server and uses its own version numbering system.

Database Tools
--------------

:dbtools:`MongoDB Database Tools </>` are released separately
from the MongoDB Server and use their own version numbering system.
