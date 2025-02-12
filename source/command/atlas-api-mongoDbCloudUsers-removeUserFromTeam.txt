.. _atlas-api-mongoDbCloudUsers-removeUserFromTeam:

==============================================
atlas api mongoDbCloudUsers removeUserFromTeam
==============================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Removes one MongoDB Cloud user from one team.

You can remove an active user or a user that has not yet accepted the invitation to join the organization. To use this resource, the requesting API Key must have the Organization Owner role. Note: This resource cannot be used to remove a user invited via the deprecated Invite One MongoDB Cloud User to Join One Project endpoint. This command is invoking the endpoint with OperationID: 'removeUserFromTeam'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/MongoDB-Cloud-Users/operation/removeUserFromTeam

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api mongoDbCloudUsers removeUserFromTeam [options]

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
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - --file
     - string
     - false
     - path to the file which contains the api request contents
   * - -h, --help
     - 
     - false
     - help for removeUserFromTeam
   * - --orgId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies the organization that contains your projects
   * - --output
     - string
     - false
     - preferred api format, can be ["json", go-template] This value defaults to "json".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --pretty
     - 
     - false
     - flag that indicates whether the response body should be in the prettyprint format
   * - --teamId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies the team to remove the MongoDB user from
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2043-01-01"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2043-01-01".

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

