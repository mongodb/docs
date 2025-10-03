.. _atlas-clusters-sampleData:

=========================
atlas clusters sampleData
=========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage sample data for your cluster.

The sampleData command provides access to sample data to be loaded onto your cluster.

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
     - help for sampleData

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

* :ref:`atlas-clusters-sampleData-describe` - Return the details for the specified sample data load job.
* :ref:`atlas-clusters-sampleData-load` - Load sample data into the specified cluster for your project.
* :ref:`atlas-clusters-sampleData-watch` - Watch the specified sample data job in your cluster until it completes.


.. toctree::
   :titlesonly:

   describe </command/atlas-clusters-sampleData-describe>
   load </command/atlas-clusters-sampleData-load>
   watch </command/atlas-clusters-sampleData-watch>

