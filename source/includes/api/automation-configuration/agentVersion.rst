The ``agentVersion`` object is optional and specifies the version of
Automation Agent.

.. note::

   While you can update the Automation Agent version through this
   configuration property, it is recommended to use the
   :ref:`Update Agent Versions <update-monitoring-backup-versions>`
   endpoint to ensure your versions are up to date.

.. code-block:: cfg

   "agentVersion" : {
       "name" : <string>,
       "directoryUrl" : <string>
   }

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``agentVersion``
     - object
     - *Optional* The version of the Automation Agent to run. If the
       running version does not match this setting, the Automation Agent
       downloads the specified version, shuts itself down, and starts the
       new version.

   * - | ``agentVersion``
       | ``.name``
     - string
     - The desired version of the Automation Agent (e.g. "1.8.1.1042-1").

   * - | ``agentVersion``
       | ``.directoryUrl``
     - string
     - The URL from which to download Automation Agent.
