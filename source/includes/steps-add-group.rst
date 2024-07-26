.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-projects.rst
      
   .. step:: Go to the :guilabel:`Create a Project` page.
      
      Click :guilabel:`New Project`.
      
      You can also expand the :guilabel:`Projects` menu in the navigation
      bar, then click :guilabel:`+ New Project`.
      
      .. note::
      
         To create a new project when LDAP is the authentication method:
      
         1. Go to the :guilabel:`Admin Console`.
         2. Select :guilabel:`Organizations`.
         3. Click :guilabel:`New Project` for the Organisation for which you wish to create the project.
      
   .. step:: Select |mms|.
      
      a. Click |mms|.
      #. Click :guilabel:`Next`.
      
      To learn more about |service|, see
      `https://www.mongodb.com/cloud <https://www.mongodb.com/cloud>`_.
      
   .. step:: Enter a name for the :guilabel:`Project`.
      
      If you selected an |service| project, enter a name for the
      :guilabel:`Organization`.
      
   .. step:: Configure |ldap| options.
      
      If managing |mms| users through |ldap|, enter values for the
      following **Optional LDAP Configuration** fields .
      
      .. important::
      
         **Multiple LDAP Groups Can Map to One Role**
      
         |mms| roles can include more than one LDAP group. Type
         multiple LDAP group names in the relevant role fields separated
         by two semicolons (``;;``).
      
      .. list-table::
         :header-rows: 1
         :widths: 30 70
      
         * - Field
      
           - Action
      
         * - :guilabel:`LDAP Groups for Project Owner Role`
      
           - Type the LDAP group(s) to which the Project Owners of the
             |mms| project belong. You can type multiple LDAP groups into
             this field if they are separated by two semicolons (``;;``).
      
         * - :guilabel:`LDAP Groups for Automation Admin Role`
      
           - Type the LDAP group(s) to which |mms| project's Automation
             Administrators belong. You can type multiple LDAP groups
             into this field if they are separated by two semicolons
             (``;;``).
      
         * - :guilabel:`LDAP Groups for Backup Admin Role`
      
           - Type the LDAP group(s) to which |mms| project's Backup
             Administrators belong. You can type multiple LDAP groups
             into this field if they are separated by two semicolons
             (``;;``).
      
         * - :guilabel:`LDAP Groups for Monitoring Admin Role`
      
           - Type the LDAP group(s) to which |mms| project's Monitoring
             Administrators belong. You can type multiple LDAP groups
             into this field if they are separated by two semicolons
             (``;;``).
      
         * - :guilabel:`LDAP Groups for User Admin Role`
      
           - Type the LDAP group(s) to which |mms| project's User
             Administrators belong. You can type multiple LDAP groups
             into this field if they are separated by two semicolons
             (``;;``).
      
         * - :guilabel:`LDAP Groups for Read Only Role`
      
           - Type the LDAP group(s) to which |mms| project's Read Only
             Users belong. You can type multiple LDAP groups into this
             field if they are separated by two semicolons (``;;``).
      
   .. step:: Add members to your project.
      
      For existing |mms| users, enter their username. Usually, this is the
      email the person used to register.
      
      For new |mms| users, enter their email address to send an invitation.
      
   .. step:: Specify the access for the members.
      
   .. step:: Click the :guilabel:`Create Project` button to create the project.
