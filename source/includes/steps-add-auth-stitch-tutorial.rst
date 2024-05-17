.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-charts.rst

   .. include:: /includes/nav/steps-embedding.rst
      
   .. step:: Go to the :guilabel:`Authentication Settings` view.
      
      Click the :guilabel:`Authentication Settings` tab.
      
   .. step:: Add the authentication provider.
      
      a. From the :guilabel:`Authentication providers` section, click 
         :guilabel:`Add`.

      #. In the :guilabel:`Name` field, enter a descriptive name for 
         the provider.

      #. From the :guilabel:`Provider` list, select 
         :guilabel:`Atlas App Services`.

      #. From the :guilabel:`Atlas Project` list, select the 
         |cloud-svc| project that contains your app service.

      #. From the :guilabel:`App ID` list, select the app service to 
         use for authentication.

   .. step:: Set toggle switch for using {+atlas-app-services+} rules for data access.

      In addition to authenticating users for embedded chart access, 
      you can perform fine-grained data access control with your app 
      service :stitch:`service rules 
      </services/define-a-service-rule/>`. Set the toggle switch to
      :guilabel:`On` if you want to enable rule enforcement.
      
      When this option is enabled, any {+app-services+} rules defined 
      on collections will be observed by |charts-short| when retrieving 
      chart data. You can use this feature to restrict access to the 
      data shown on your chart, including showing different subsets of 
      data to different users, depending on their
      :stitch:`role </mongodb/define-roles-and-permissions>`.
      
      .. note::
      
         - This option assumes that the :ref:`data source 
           <data-sources>` for
           this chart uses the same MongoDB database and collection as 
           your app service.
      
         - Using this option may have a performance impact, so you 
           should leave it off if you do not need to restrict data 
           access based on {+app-services+} rules.
      
   .. step:: Enter service name.

      Enter the name of the service that fetches data from
      MongoDB. To find the name of your data service:
      
      a. Navigate to your app service.
      
      #. Click :guilabel:`Clusters` in the sidebar navigation.
      
      #. The service name is listed under :guilabel:`App Service Name`.
      
   .. step:: Click the :guilabel:`Save` button.
