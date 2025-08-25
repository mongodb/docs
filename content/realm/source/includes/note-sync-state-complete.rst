.. note:: Subscription State "Complete"

   The subscription set state "complete" does not mean "sync is done" or "all
   documents have been synced". "Complete" means the following two things have
   happened:
   
   - The subscription has become the active subscription set that is currently
     being synchronized with the server.
   - The documents that matched the subscription *at the time the subscription
     was sent to the server* are now on the local device. Note that this does
     not necessarily include all documents that currently match the
     subscription.
  
   The Realm SDK does not provide a way to check whether all documents that
   match a subscription have synced to the device.
