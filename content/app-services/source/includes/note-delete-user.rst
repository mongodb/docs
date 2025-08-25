.. note::

   App Services does not automatically delete any data in your linked
   MongoDB Atlas cluster that you have associated with a deleted user. For example,
   if your application allows users to create data that linked to a user by
   including their ID in an ``owner_id`` field, deleting the user object does
   not delete the user-created linked data. To remove all traces of a deleted
   user, you must manually delete or modify any such documents.
