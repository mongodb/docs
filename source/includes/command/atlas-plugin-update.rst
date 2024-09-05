.. _atlas-plugin-update:

===================
atlas plugin update
===================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Update Atlas CLI plugin.

Update an Atlas CLI plugin.
You can specify a plugin to update using either the "<github-owner>/<github-repository-name>" format or the plugin name.
Additionally, you can use the "--all" flag to update all plugins.


Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas plugin update [plugin] [options]

.. Code end marker, please don't delete this comment

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - plugin
     - string
     - false
     - Plugin identifier.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --all
     - 
     - false
     - update all plugins
   * - -h, --help
     - 
     - false
     - help for update

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

Examples
--------

.. code-block::
   :copyable: false

   # Update a plugin:
   atlas plugin update mongodb/atlas-cli-plugin-example
   atlas plugin update atlas-cli-plugin-example
   
   
.. code-block::
   :copyable: false

   # Update all plugins
   atlas plugin update --all
