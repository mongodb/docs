.. _atlas-metrics:

=============
atlas metrics
=============

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Get metrics on the MongoDB process.

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
     - help for metrics

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

* :ref:`atlas-metrics-databases` - List available databases or database metrics for a given host.
* :ref:`atlas-metrics-disks` - List available disks or disk metrics for a given host.
* :ref:`atlas-metrics-processes` - Return the process measurements for the specified host.


.. toctree::
   :titlesonly:

   databases </command/atlas-metrics-databases>
   disks </command/atlas-metrics-disks>
   processes </command/atlas-metrics-processes>

