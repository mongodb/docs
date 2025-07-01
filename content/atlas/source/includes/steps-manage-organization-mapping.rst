.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-org-settings.rst
      
   .. step:: Open the :guilabel:`Federation Management Console`.
      
      In :guilabel:`Manage Federation Settings`, click
      :guilabel:`Open Federation Management App`.
      
   .. step:: Connect an organization to the Federation Application.
      
      a. Click :guilabel:`View Organizations`.
      
         |service| displays all organizations where you are an
         :authrole:`Organization Owner`.
      
         Organizations which are not already connected to the Federation
         Application have :guilabel:`Connect` button in the
         :guilabel:`Actions` column.
      
      #. Click the desired organization's :guilabel:`Connect` button.
      
   .. step:: Apply an Identity Provider to the organization.
      
      From the :guilabel:`Organizations` screen in the management console:
      
      a. Click the :guilabel:`Name` of the organization you want to map to
         an |idp|.
      
      #. On the :guilabel:`Identity Provider` screen, click
         :guilabel:`Apply Identity Provider`.
      
         |service| directs you to the :guilabel:`Identity Providers` screen
         which shows all |idps| you have linked to |service|.
      
      #. For the |idp| you want to apply to the organization, click
         :guilabel:`Add Organizations`.
      
      #. In the :guilabel:`Apply Identity Provider to Organizations` modal,
         select the organizations to which this |idp| applies.
      
      #. Click :guilabel:`Confirm`.
      
   .. step:: Connect an organization to the Federation Application.
      
      a. Click :guilabel:`Organizations` in the left navigation.
      
      #. In the list of :guilabel:`Organizations`, ensure that your desired
         organizations now have the expected
         :guilabel:`Identity Provider`.
      