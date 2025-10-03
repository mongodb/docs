.. _atlas-auditing:

==============
atlas auditing
==============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Returns database auditing settings for MongoDB Cloud projects.

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
     - help for auditing

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

* :ref:`atlas-auditing-describe` - Returns the auditing configuration for the specified project.
* :ref:`atlas-auditing-update` - Updates the auditing configuration for the specified project


.. toctree::
   :titlesonly:

   describe </command/atlas-auditing-describe>
   update </command/atlas-auditing-update>

