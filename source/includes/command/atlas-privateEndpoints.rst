.. _atlas-privateEndpoints:

======================
atlas privateEndpoints
======================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage Atlas private endpoints.

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
     - help for privateEndpoints

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

* :ref:`atlas-privateEndpoints-aws` - Manage AWS Private Endpoints.
* :ref:`atlas-privateEndpoints-azure` - Manage Azure Private Endpoints.
* :ref:`atlas-privateEndpoints-gcp` - Manage GCP private endpoints.
* :ref:`atlas-privateEndpoints-regionalModes` - Manage regionalized private endpoint setting for your Atlas project.


.. toctree::
   :titlesonly:

   aws </command/atlas-privateEndpoints-aws>
   azure </command/atlas-privateEndpoints-azure>
   gcp </command/atlas-privateEndpoints-gcp>
   regionalModes </command/atlas-privateEndpoints-regionalModes>

