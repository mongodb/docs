.. warning:: Custom Data May Be Stale
   
   App Services does not dynamically update a user's custom data if the
   underlying document changes. Instead, App Services fetches a new copy
   of the data whenever a user refreshes their access token, such as
   when they log in. This may mean that the custom data won't
   immediately reflect changes, e.g. updates from an authentication
   Trigger. If the token is not refreshed, the SDK waits 
   30 minutes and then refreshes it on the next call to the backend, so custom user 
   data could be stale for up to 30 minutes plus the time until the next SDK 
   call to the backend occurs.