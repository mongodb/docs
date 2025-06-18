.. io-code-block::
   :copyable: true

   .. input::
      :language: text

      List all my organizations, projects, and clusters in Atlas.
  
   .. output::
      :language: text
      :visible: false
      :emphasize-lines: 2,4,6,8

      I'll help you list all your MongoDB Atlas organizations, projects, and clusters. Let me retrieve that information for you.
        Ran `atlas-list-orgs` - MongoDB (MCP Server)
      Now that I've found your organization, let me list all the projects under it.
        Ran `atlas-list-projects` - MongoDB (MCP Server)
      Now, let me list all the clusters across all your projects:
        Ran `atlas-list-clusters` - MongoDB (MCP Server)
      Let me get more detailed information about each of your clusters:
        Ran `atlas-inspect-cluster` - MongoDB (MCP Server)

      Summary of Your Atlas Resources
      
      Organization
      - MongoDB (ID: <your-org-id>)
      
      Projects (2)
      - Sample Project (ID: <proj-id-1>)
      - Test Project (ID: <proj-id-2>)

      Clusters (2)

      1. Cluster0 (in Sample Project)
         - Type: DEDICATED
         - Tier: M20
         - State: UPDATING
         - MongoDB Version: 8.1.1
         - Connection String: <connection-string-1>

      2. Cluster1 (in Test Project)
         - Type: FREE
         - Tier: N/A
         - State: IDLE
         - MongoDB Version: 8.0.10
         - Connection String: <connection-string-2>
       
.. io-code-block::
   :copyable: true

   .. input::
      :language: text

      Create a new database user with read-only access to the "products" 
      collection, then add my current IP address to my cluster's access list.
  
   .. output::
      :language: text
      :visible: false
      :emphasize-lines: 2,4,6,8,10,12,14

      I'll help you create a new database user with read-only access to the "products" collection and add your current IP address to your cluster's access list. Let me do this step-by-step.
        Ran `atlas-list-orgs` - MongoDB (MCP Server)
      First, I need to get information about your available Atlas projects to determine where to create the database user.
        Ran `atlas-list-projects` - MongoDB (MCP Server)
      Now, let's check which clusters are available:
        Ran `atlas-list-clusters` - MongoDB (MCP Server)
      Let's create a new database user with read-only access to the "products" collection in the Project with the Cluster. I'll create a user named "products_readonly":
        Ran `atlas-create-db-user` - MongoDB (MCP Server) 
      Great! Now let's add your current IP address to the cluster's access list:
         Ran `atlas-create-access-list` - MongoDB (MCP Server)       
      Let's verify the IP was added by checking the access list:
         Ran `atlas-inspect-access-list` - MongoDB (MCP Server)
      Perfect! Now let's also verify the user was created by listing all database users:
         Ran `atlas-list-db-users` - MongoDB (MCP Server)

      Summary of Actions Completed

      1. Created a new database user:
        - Username: products_readonly
        - Password: <generated-password> (save this in a secure location)
        - Access: Read-only access  to the "products" collection in the "sample_store" database
        - Project: Project (ID: <proj-id>)
        - Cluster: Sample Cluster
      2. Added your current IP address to the cluster's access list:
        - IP Address: <your-ip-address>
        - Project: Sample Project (ID: <proj-id>)
        - Comment: "Added for products_readonly user"
   
      The new user can now connect to your Atlas cluster and read data from the "products" collection, but cannot modify it. Your IP address has been added to the access list, allowing you to connect to the cluster from your current location.
      