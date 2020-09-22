The :data:`mongoDbVersions[n]` array defines specification objects for
the MongoDB instances found in the :data:`processes` array. Each
MongoDB instance in the :data:`processes` array must have a
specification object in this array.

.. code-block:: json
   :linenos:

   "mongoDbVersions[n]" : [
     {
      "name" : "<string>",
       "builds" : [
         {
          "platform" : "<string>",
           "url" : "<string>",
           "gitVersion" : "<string>",
           "modules" : [ "<string>", ... ],
           "architecture" : "<string>",
           "bits" : "<integer>",
           "win2008plus" : "<Boolean>",
           "winVCRedistUrl" : "<string>",
           "winVCRedistOptions" : [ "<string>", ... ],
           "winVCRedistDll" : "<string>",
           "winVCRedistVersion" : "<string>"
         },
         ...
       ],
     },
     ...
   ]

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - mongoDbVersions[n]
     - array of objects
     - Required
     - Specification objects for the MongoDB instances found in the
       **processes** array. Each MongoDB instance in **processes** must
       have a specification object in **mongoDbVersions[n]**.

   * - mongoDbVersions[n].name
     - string
     - Required
     - Name of the specification object. The specification object is
       attached to a MongoDB instance through the instance's
       **processes.version** parameter in this configuration.

   * - mongoDbVersions[n].builds[k]
     - array of objects
     - Required
     - Builds available for this MongoDB instance.

   * - mongoDbVersions[n].builds[k].platform
     - string
     - Required
     - Platform for this MongoDB instance.

   * - mongoDbVersions[n].builds[k].url
     - string
     - Required
     - |url| from which to download MongoDB for this instance.

   * - mongoDbVersions[n].builds[k].gitVersion
     - string
     - Required
     - Commit identifier that identifies the state of the code used
       to build the MongoDB process. The MongoDB :manual:`buildInfo
       </reference/command/buildInfo>` command returns the gitVersion
       identifier.

   * - mongoDbVersions[n].builds[k].modules
     - array
     - Required
     - List of modules for this version. Corresponds to the **modules**
       parameter that the **buildInfo** command returns.

   * - mongoDbVersions[n].builds[k].architecture
     - string
     - Required
     - Processor's architecture. |mms| accepts **amd64** or
       **ppc64le**.

   * - mongoDbVersions[n].builds[k].bits
     - integer
     - Deprecated
     - Processor's bus width. Don't remove or make modifications to
       this parameter.

   * - mongoDbVersions[n].builds[k].win2008plus
     - Boolean
     - Optional
     - Set to **true** if this is a Windows build that requires either
       Windows 7 later or Windows Server 2008 R2 or later.

   * - mongoDbVersions[n].builds[k].winVCRedistUrl
     - string
     - Optional
     - |url| from which the required version of the Microsoft Visual
       C++ redistributable can be downloaded.

   * - mongoDbVersions[n].builds[k].winVCRedistOptions
     - array of strings
     - Optional
     - String values that list the command-line options to be specified
       when running the Microsoft Visual C++ redistributable installer.
       Each command-line option is a separate string in the array.

   * - mongoDbVersions[n].builds[k].winVCRedistDll
     - string
     - Optional
     - Name of the Microsoft Visual C++ runtime DLL file that the agent
       checks to determine if a new version of the Microsoft Visual C++
       redistributable is needed.

   * - mongoDbVersions[n].builds[k].winVCRedistVersion
     - string
     - Optional
     - Minimum version of the Microsoft Visual C++ runtime DLL that
       must be present to skip over the installation of the Microsoft
       Visual C++ redistributable.
