.. warning::

   When a user logs out, you can no longer read or write data in any
   synced realms that the user opened. As a result, any operation
   that has not yet completed before the initiating user logs out cannot
   complete successfully and will likely result in an error. Any data in
   a write operation that fails in this way will be lost.
