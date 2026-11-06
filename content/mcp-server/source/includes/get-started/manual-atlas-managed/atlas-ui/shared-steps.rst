.. step:: Select the Organization and Project for your Service Account.
   
   Go to the :guilabel:`Service Accounts` page for your project.

   If it's not already displayed, select the organization that
   contains your project from the :guilabel:`Organizations` menu in
   the navigation bar.

   If it's not already displayed, select your project from the
   :guilabel:`Projects` menu in the navigation bar.

   .. important::

      You must have either ``Organization Owner`` or ``Project Owner`` 
      privileges to create a service account.

   In the sidebar under :guilabel:`Security`, click 
   :guilabel:`Project Access Manager`, then click the
   :guilabel:`Service Accounts` tab.

   .. tip::

      To create a configuration for an entire organization instead of a
      single project, click :guilabel:`Organization Access Manager` in
      the navigation bar, then click the :guilabel:`Service Accounts`
      tab.

.. step:: Open the configuration wizard.

   In the :guilabel:`Atlas Managed MCP` card, click
   :guilabel:`Add new`. If the project has no MCP configurations yet,
   click :guilabel:`Create configuration`.

.. step:: Enter your configuration information.

   a. In the :guilabel:`Name` box, enter a descriptive name that helps
      you and your team identify this configuration in your list of MCP
      configurations.

   #. Under :guilabel:`Client Secret Expiration`, select how long the
      client secret remains valid. To set a custom duration, select
      :guilabel:`Custom Expiration` and enter a value.

   #. Under :guilabel:`Roles`, select the Atlas roles that determine
      the level of access the agent has to your project. You must
      select at least one role.

      If you select a role that grants write access, Atlas displays a
      banner that warns you that the configuration grants read and
      write access across your project environment and data. For an
      agent that only reads data, select a read-only role.

.. step:: (Optional) Add entries to the API access list.

   Expand the :guilabel:`API Access List (Optional)` card and click
   :guilabel:`ADD ACCESS LIST ENTRY`. Each entry can be either a single
   IP address or an IP range in CIDR notation. Atlas accepts MCP
   connections only from the addresses in this list.

.. step:: Create the configuration.

   Click :guilabel:`Create`. Atlas creates the configuration and
   generates its client secret.

.. step:: Copy your credentials.

   After Atlas creates the configuration, the
   :guilabel:`Configuration Details` card displays the configuration's
   client ID and client secret.

   .. important::

      You can retrieve the :guilabel:`Client Secret` only once. Copy it
      and store it in a secure location. After you leave this page, the
      client secret becomes unavailable. If you lose the client secret,
      generate a new one from the configuration's detail page.
