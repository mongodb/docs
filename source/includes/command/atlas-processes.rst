.. _atlas-processes:

===============
atlas processes
===============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage MongoDB processes for your project.

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
     - help for processes

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

* :ref:`atlas-processes-describe` - Return the details for the specified MongoDB process for your project.
* :ref:`atlas-processes-list` - Return all MongoDB processes for your project.


.. toctree::
   :titlesonly:

   describe </command/atlas-processes-describe>
   list </command/atlas-processes-list>

