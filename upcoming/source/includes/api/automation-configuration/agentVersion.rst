**agentVersion** specifies the version of the {+mdbagent+}.

.. note::

   While you can update the {+mdbagent+} version through this
   configuration property, you should use the
   :ref:`Update Agent Versions <update-monitoring-backup-versions>`
   endpoint to ensure your versions are up to date.

.. code-block:: json

   "agentVersion" : {
     "name" : "<string>",
     "directoryUrl" : "<string>"
   }

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - agentVersion
     - object
     - Optional
     - Version of the {+mdbagent+} to run. If the running version
       does not match this setting, the {+mdbagent+} downloads the
       specified version, shuts itself down, and starts the new
       version.

   * - agentVersion.name
     - string
     - Optional
     - Desired version of the {+mdbagent+}.

   * - agentVersion.directoryUrl
     - string
     - Optional
     - |url| from which to download the {+mdbagent+}.
