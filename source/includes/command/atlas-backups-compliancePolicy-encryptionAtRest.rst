.. _atlas-backups-compliancePolicy-encryptionAtRest:

===============================================
atlas backups compliancePolicy encryptionAtRest
===============================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage encryption-at-rest for the backup compliance policy for your project. Encryption-at-rest enforces all clusters with a Backup Compliance Policy to use Customer Key Management.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -h, --help
     - 
     - false
     - help for encryptionAtRest

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Related Commands
----------------

* :ref:`atlas-backups-compliancePolicy-encryptionAtRest-disable` - Disable encryption-at-rest for the backup compliance policy for your project.
* :ref:`atlas-backups-compliancePolicy-encryptionAtRest-enable` - Enable encryption-at-rest for the backup compliance policy for your project.


.. toctree::
   :titlesonly:

   disable </command/atlas-backups-compliancePolicy-encryptionAtRest-disable>
   enable </command/atlas-backups-compliancePolicy-encryptionAtRest-enable>

