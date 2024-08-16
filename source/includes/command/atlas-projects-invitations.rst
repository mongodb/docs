.. _atlas-projects-invitations:

==========================
atlas projects invitations
==========================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Invitation operations.

Create, list and manage your MongoDB project invites.

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
     - help for invitations

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

* :ref:`atlas-projects-invitations-delete` - Remove the specified pending invitation to your project.
* :ref:`atlas-projects-invitations-describe` - Return the details for the specified pending invitation to your project.
* :ref:`atlas-projects-invitations-invite` - Invite the specified MongoDB user to your project.
* :ref:`atlas-projects-invitations-list` - Return all pending invitations to your project.
* :ref:`atlas-projects-invitations-update` - Modifies the details of the specified pending invitation to your project.


.. toctree::
   :titlesonly:

   delete </command/atlas-projects-invitations-delete>
   describe </command/atlas-projects-invitations-describe>
   invite </command/atlas-projects-invitations-invite>
   list </command/atlas-projects-invitations-list>
   update </command/atlas-projects-invitations-update>

