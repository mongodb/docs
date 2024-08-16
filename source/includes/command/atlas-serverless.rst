.. _atlas-serverless:

================
atlas serverless
================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage serverless instances for your project.

The serverless command provides access to your serverless instance configurations. You can create, edit, and delete serverless instances.

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
     - help for serverless

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

* :ref:`atlas-serverless-backups` - Manage cloud backups for your project.
* :ref:`atlas-serverless-create` - Creates one serverless instance in the specified project.
* :ref:`atlas-serverless-delete` - Remove a serverless instance from your project.
* :ref:`atlas-serverless-describe` - Return one serverless instance in the specified project.
* :ref:`atlas-serverless-list` - Return all serverless instances in the specified project.
* :ref:`atlas-serverless-update` - Updates one serverless instance in the specified project.
* :ref:`atlas-serverless-watch` - Monitor the status of serverless instance.


.. toctree::
   :titlesonly:

   backups </command/atlas-serverless-backups>
   create </command/atlas-serverless-create>
   delete </command/atlas-serverless-delete>
   describe </command/atlas-serverless-describe>
   list </command/atlas-serverless-list>
   update </command/atlas-serverless-update>
   watch </command/atlas-serverless-watch>

