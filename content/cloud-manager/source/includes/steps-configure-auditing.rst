.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Click :guilabel:`Modify` next to the MongoDB process for which you want to configure auditing.
      
   .. step:: Click :guilabel:`Advanced Configuration Options`.
      
   .. step:: Click :guilabel:`+ Add Option`.
      
   .. step:: Select :guilabel:`auditLogDestination` from the :guilabel:`Startup Option` menu.
      
   .. step:: Select the desired destination for audit events from the :guilabel:`Value` menu.
      
   .. step:: (Optional) If you selected ``file`` as the audit log destination, repeat step 4 and specify the following additional properties:

      - ``auditLogFormat``: ``JSON`` or ``BSON``
      
      - ``auditLogPath``: the desired location of the audit log file
      
   .. step:: (Optional) To filter which events are audited, repeat steps 1-4 and add the ``auditLogFilter`` property.
      
      For information about how to create filters, see 
      :manual:`Configure Audit Filters</tutorial/configure-audit-filters>`.
      
   .. step:: Click :guilabel:`Apply` to deploy your auditing configuration.
