The :data:`mongoDbVersions` array defines specification objects for the
MongoDB instances found in the :data:`processes` array. Each MongoDB
instance in the :data:`processes` array must have a specification object
in this array.

.. code-block:: cfg

   "mongoDbVersions" : [
       {
           "name" : <string>,
           "builds" : [
               {
                   "platform" : <string>,
                   "url" : <string>,
                   "gitVersion" : <string>,
                   "modules" : [ <string>, ... ],
                   "architecture" : <string>,
                   "bits" : <integer>,
                   "win2008plus" : <Boolean>,
                   "winVCRedistUrl" : <string>,
                   "winVCRedistOptions" : [ <string>, ... ],
                   "winVCRedistDll" : <string>,
                   "winVCRedistVersion" : <string>
               },
               ...
           ],
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``mongoDbVersions``
     - object array
     - The ``mongoDbVersions`` array is required and defines specification
       objects for the MongoDB instances found in the ``processes``
       array. Each MongoDB instance in ``processes`` must have a
       specification object in ``mongoDbVersions``.

   * - | ``mongoDbVersions``
       | ``.name``
     - string
     - The name of the specification object. The specification object
       is attached to a MongoDB instance through the instance's
       ``processes.version`` field in this configuration.

   * - | ``mongoDbVersions``
       | ``.builds``
     - object array
     - Objects that define the builds for this MongoDB instance.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.platform``
     - string
     - The platform for this MongoDB instance.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.url``
     - string
     - The URL from which to download MongoDB for this instance.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.gitVersion``
     - string
     - The commit identifier that identifies the state of the code used to
       build the MongoDB process. The MongoDB :manual:`buildInfo
       </reference/command/buildInfo>` command returns the gitVersion
       identifier.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.modules``
     - array
     - The list of modules for this version. Corresponds to the
       ``modules`` field returned by MongoDB 3.2+ ``buildInfo`` command.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.architecture``
     - string
     - The processor's architecture. Possible values are ``amd64`` or
       ``ppc64le``.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.bits``
     - integer
     - *Deprecated*. The processor's bus width. Do not remove or make
       modifications to this field.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.win2008plus``
     - Boolean
     - *Optional*. Set to ``true`` if this is a Windows build that
       requires either Windows 7 later or Windows Server 2008 R2 or later.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.winVCRedistUrl``
     - string
     - *Optional*. The URL from which the required version of the
       Microsoft Visual C++ redistributable can be downloaded.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.winVCRedistOptions``
     - array
     - *Optional*. String values that list the command-line options to be
       specified when running the Microsoft Visual C++ redistributable
       installer. Each command-line option is a separate string in the
       array.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.winVCRedistDll``
     - string
     - *Optional*. The name of the Microsoft Visual C++ runtime DLL file
       that the agent will check to determine if a new version of the
       Microsoft Visual C++ redistributable is needed.

   * - | ``mongoDbVersions``
       | ``.builds``
       | ``.winVCRedistVersion``
     - string
     - *Optional*. The minimum version of the Microsoft Visual C++ runtime
       DLL that must be present to skip over the installation of the
       Microsoft Visual C++ redistributable.
