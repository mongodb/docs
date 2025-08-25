.. warning:: User Metadata May Be Stale
   
   Atlas App Services fetches the most recent version of user metadata when a user
   logs in. If the user changes their email address or profile photo with a 
   login provider, for example, those changes do not update in user metadata 
   until the user logs in again. Because we cache credentials and enable you 
   to bypass the login flow, user metadata may become stale unless you 
   force the user to log in again.