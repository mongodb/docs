.. _atlas-api-rollingIndex:

======================
atlas api rollingIndex
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates one index to a database deployment in a rolling manner.

You can't create a rolling index on an M0 free cluster or M2/M5 shared cluster.

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
     - help for rollingIndex

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

* :ref:`atlas-api-rollingIndex-createRollingIndex` - `experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Creates an index on the cluster identified by its name in a rolling manner.


.. toctree::
   :titlesonly:

   createRollingIndex </command/atlas-api-rollingIndex-createRollingIndex>

