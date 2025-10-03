.. _atlas-networking-peering-create:

===============================
atlas networking peering create
===============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create a connection with AWS, Azure and Google Cloud.

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
     - help for create

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

* :ref:`atlas-networking-peering-create-aws` - Create a network peering connection between the Atlas VPC and your AWS VPC.
* :ref:`atlas-networking-peering-create-azure` - Create a network peering connection between the Atlas VPC and your Azure VNet.
* :ref:`atlas-networking-peering-create-gcp` - Create a network peering connection between the Atlas VPC and your Google Cloud VPC.


.. toctree::
   :titlesonly:

   aws </command/atlas-networking-peering-create-aws>
   azure </command/atlas-networking-peering-create-azure>
   gcp </command/atlas-networking-peering-create-gcp>

