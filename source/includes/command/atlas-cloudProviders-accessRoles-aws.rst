.. _atlas-cloudProviders-accessRoles-aws:

====================================
atlas cloudProviders accessRoles aws
====================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Manage AWS IAM role access in Atlas.

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
     - help for aws

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

* :ref:`atlas-cloudProviders-accessRoles-aws-authorize` - Authorize an AWS IAM role.
* :ref:`atlas-cloudProviders-accessRoles-aws-create` - Create an AWS IAM role.
* :ref:`atlas-cloudProviders-accessRoles-aws-deauthorize` - Deauthorize an AWS IAM role.


.. toctree::
   :titlesonly:

   authorize </command/atlas-cloudProviders-accessRoles-aws-authorize>
   create </command/atlas-cloudProviders-accessRoles-aws-create>
   deauthorize </command/atlas-cloudProviders-accessRoles-aws-deauthorize>

