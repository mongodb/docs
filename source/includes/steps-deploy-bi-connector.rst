.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
      
   .. step:: Navigate to the :guilabel:`Processes` tab for your deployment.
      
   .. step:: Choose :guilabel:`New BI Connector`.

      a. Click the :guilabel:`Add New` dropdown menu.
      b. Click :guilabel:`New BI Connector`.
      
   .. step:: Configure the BI Connector instance.
      
      In the :guilabel:`New BI Connector` modal, configure the following
      settings:
      
      .. list-table::
         :widths: 30 70
      
         * - :guilabel:`Choose Server`
           - Select the host where this new BI Connector is installed.
      
         * - :guilabel:`Deployment Item`
           - Select the deployment item (standalone, :manual:`replica set </reference/glossary/#std-term-replica-set>`, 
             or :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>`) to which this new BI connector 
             connects.
      
         * - :guilabel:`Port to Listen On`
           - Type the |iana| port number you want to use when connecting
             to this new BI Connector. The recommended port number is
             ``3306``.
      
         * - :guilabel:`Read Preference`
           - Select how the BI connector routes read operations to the 
             members of a :manual:`replica set </reference/glossary/#std-term-replica-set>`. Available values include:
      
             - :readmode:`Primary <primary>`
             - :readmode:`Primary Preferred <primaryPreferred>`
             - :readmode:`Secondary Only <secondary>`
             - :readmode:`Secondary Preferred <secondaryPreferred>`
             - :readmode:`Nearest <nearest>`
      
         * - :guilabel:`Included Namespace(s)` *(Optional)* 
           - Type the name of a database and/or collection to limit what
             data the BI Connector can access.
      
             Leave this box blank to allow the BI Connector to use all 
             namespaces on the host.
      
             Click the :guilabel:`+ add another namespace` link to add 
             another namespace to your list of included namespaces.
      
   .. step:: Set any :guilabel:`Additional settings` for the BI Connector instance.
      
   .. step:: Click :guilabel:`Create`.
      
   .. step:: Click :guilabel:`Review & Deploy` to review your changes.
    
   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      
