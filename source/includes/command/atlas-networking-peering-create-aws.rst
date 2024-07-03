.. _atlas-networking-peering-create-aws:

===================================
atlas networking peering create aws
===================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Create a network peering connection between the Atlas VPC and your AWS VPC.

The network peering create command checks if a VPC exists in the region you specify for your Atlas project. If one exists, this command creates the peering connection between that VPC and your VPC. If an Atlas VPC doesn't exist, this command creates one and creates a connection between it and your VPC.
		
To learn more about network peering connections, see https://www.mongodb.com/docs/atlas/security-vpc-peering/.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas networking peering create aws [options]

.. Code end marker, please don't delete this comment

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --accountId
     - string
     - true
     - Unique twelve-digit AWS account ID that owns the peer VPC.
   * - --atlasCidrBlock
     - string
     - false
     - CIDR block that Atlas uses for all network peering connections created in the project. This option is required only if you do not already have an Atlas VPC. To learn more, see the Atlas UI tab at https://dochub.mongodb.org/core/peering-connection-atlas.
   * - -h, --help
     - 
     - false
     - help for aws
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.
   * - --region
     - string
     - true
     - Cloud provider region where the VPC that you peered with the Atlas VPC resides.
   * - --routeTableCidrBlock
     - string
     - true
     - Peer VPC CIDR block or subnet.
   * - --vpcId
     - string
     - true
     - Unique identifier of the peer VPC.

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

Output
------

If the command succeeds, the CLI returns output similar to the following sample. Values in brackets represent your values.

.. code-block::

   Network peering connection '<Id>' created.
   

Examples
--------

.. code-block::
   :copyable: false

   # Create a network peering connection between the Atlas VPC in CIDR block 192.168.0.0/24 and your AWS VPC in CIDR block 10.0.0.0/24 for AWS account number 854333054055:
   atlas networking peering create aws --accountId 854333054055 --atlasCidrBlock 192.168.0.0/24 --region us-east-1 --routeTableCidrBlock 10.0.0.0/24 --vpcId vpc-078ac381aa90e1e63
