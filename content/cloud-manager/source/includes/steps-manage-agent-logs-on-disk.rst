.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-agents.rst
      
   .. step:: Click :guilabel:`Downloads & Settings`.
      
   .. step:: Scroll down to the :guilabel:`Agent Log Settings` section.
      
   .. step:: Edit the log settings.
      
      Click the :guilabel:`pencil` icon to edit the Monitoring Agent 
      or Backup Agent log settings:
      
      .. list-table::
         :widths: 20 10 70
         :header-rows: 1
      
         * - Name
           - Type
           - Description
      
         * - :guilabel:`Linux Log File Path`
           - string
           - *Conditional: Logs on a Linux host.* 
             The path to which the agent writes its logs on a Linux host.
      
             The suggested value is:
             
             .. code-block:: sh
                :class: copyable
      
                /var/log/mongodb-mms-automation/monitoring-agent.log
      
         * - :guilabel:`Windows Log File Path`
           - string
           - *Conditional: Logs on a Windows host.* 
             The path to which the agent writes its logs on a Windows host.
      
             The suggested value is:
      
             .. code-block:: bat
                :class: copyable
      
                %SystemDrive%\MMSAutomation\log\mongodb-mms-automation\monitoring-agent.log
      
         * - :guilabel:`Rotate Logs`
           - Toggle
           - A toggle to select if the logs should be rotated.
      
         * - :guilabel:`Size Threshold (MB)`
           - integer
           - The size where the logs rotate automatically. The default value
             is ``1000``.
      
         * - :guilabel:`Time Threshold (Hours)`
           - integer
           - The duration of time when the logs rotate automatically. The 
             default value is ``24``.
      
         * - :guilabel:`Max Uncompressed Files`
           - integer
           - *Optional.* The greatest number of log files, including the 
             current log file, that should stay uncompressed. The suggested 
             value is ``5``.
      
         * - :guilabel:`Max Percent of Disk`
           - integer
           - *Optional.* The greatest percentage of disk space on your 
             MongoDB hosts that the logs should consume. The suggested 
             value is ``2%``.
      
         * - :guilabel:`Total Number of Files`
           - integer
           - *Optional.* The total number of log files. If a number is not specified, 
             the total number of log files defaults to ``0`` and is determined by other 
             :guilabel:`Rotate Logs` settings.
      
      When you are done, click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
