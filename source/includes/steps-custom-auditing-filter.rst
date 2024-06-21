.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-advanced.rst

   .. step:: Toggle the button next to :guilabel:`Database Auditing` to :guilabel:`On`.
      
   .. step:: Select :guilabel:`Use Custom JSON Filter`.
      
   .. step:: Enter your audit filter into the text box.
      
   .. step:: Toggle :guilabel:`Audit authorization successes`.
      
      .. warning::
      
         Enabling :guilabel:`Audit authorization successes` can severely 
         impact cluster performance. Enable this option with caution.
      
      For audit filters specifying the 
      ``authCheck`` :manual:`action type 
      </reference/audit-message/#audit-event-actions-details-and-results>`, 
      by default the
      auditing system logs only authorization
      failures for any specified ``param.command``. Enabling
      :guilabel:`Audit authorization successes` directs the auditing
      system to also log authorization successes. For more information,
      see :manual:`auditAuthorizationSuccess 
      </reference/parameters/#param.auditAuthorizationSuccess>`
      
   .. step:: Click :guilabel:`Save`.    
