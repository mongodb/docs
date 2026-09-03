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
      
      The filter must be valid JSON. Enclose every field name in
      double quotes:

      .. code-block:: json

         { "atype": { "$in": [ "createCollection", "dropCollection" ] } }

      |mms| accepts filters that use other syntax, but the
      :ref:`MongoDB Agent <mongodb-agent>` can read only valid JSON.
      When the agent can't read a filter, it logs a normalization
      error each time it compares the deployment to the goal
      configuration.

      For information about how to create filters, see
      :ref:`Configure Audit Filters <audit-filter>`. The filter
      examples omit quotes around field names. Enclose each field
      name in double quotes when you set ``auditLogFilter``.
      
   .. step:: Click :guilabel:`Apply` to deploy your auditing configuration.
