1. Log in to the Realm UI, and then click :guilabel:`Triggers` in the left 
   hand panel.

#. Click the :guilabel:`Add a Trigger` button.

#. Set the :guilabel:`Trigger Type` toggle to :guilabel:`Authentication`.

#. Under Trigger Details, specify the following values:

   - :guilabel:`Name`: "onUserCreated"
   
   - :guilabel:`Enbaled`: Switch toggle to "On"
   
   - :guilabel:`Action Type`: Select "Create"

   - :guilabel:`Provider(s)`: Select "Email/Password", or whichever authentication 
     provider(s) you are using

   - :guilabel:`Select an Event Type`: Select "Function"

   - :guilabel:`Function`: Select "+New Function", and then:

     - :guilabel:`Function Name`: "onUserCreated"

     - :guilabel:`Function`: Replace the placeholder text with the following 
       function:

     .. code-block:: javascript
          
        exports = function(authEvent) {
            const user = authEvent.user;
            const collection = context.services.get("mongodb-atlas").db("Item").collection("User");
            const newDoc = {
              _id: user.id,
              email: user.data.email, // Useful for looking up user IDs by email later - assuming email/password auth is used
              team: "", // Used for tiered privileges
              isTeamAdmin: false, // Used for tiered privileges
              isGlobalAdmin: false, // Used for admin privileges
              subscribedTo: [], // Used for restricted feed
            };
            return collection.insertOne(newDoc);
        };
