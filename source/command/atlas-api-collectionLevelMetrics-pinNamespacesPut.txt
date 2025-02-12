.. _atlas-api-collectionLevelMetrics-pinNamespacesPut:

=================================================
atlas api collectionLevelMetrics pinNamespacesPut
=================================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

`experimental <https://www.mongodb.com/docs/atlas/cli/current/command/atlas-api/>`_: Pin provided list of namespaces for collection-level latency metrics collection for the given Group and Cluster.

This initializes a pinned namespaces list or replaces any existing pinned namespaces list for the Group and Cluster. This command is invoking the endpoint with OperationID: 'pinNamespacesPut'. For more information about flags, format of --file and examples, see: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Collection-Level-Metrics/operation/pinNamespacesPut

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas api collectionLevelMetrics pinNamespacesPut [options]

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
   * - --clusterName
     - string
     - true
     - human-readable label that identifies the cluster to pin namespaces to
   * - --envelope
     - 
     - false
     - flag that indicates whether Application wraps the response in an envelope JSON object
   * - --file
     - string
     - false
     - path to the file which contains the api request contents
   * - --groupId
     - string
     - true
     - unique 24-hexadecimal digit string that identifies your project
   * - -h, --help
     - 
     - false
     - help for pinNamespacesPut
   * - --output
     - string
     - false
     - preferred api format, can be ["json", go-template] This value defaults to "json".
   * - --output-file
     - string
     - false
     - file to write the api output to. This flag is required when the output of an endpoint is binary (ex: gzip) and the command is not piped (ex: atlas command > out.zip)
   * - --version
     - string
     - false
     - api version to use when calling the api call [options: "2023-11-15"], defaults to the latest version or the profiles api_version config value if set This value defaults to "2023-11-15".

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

