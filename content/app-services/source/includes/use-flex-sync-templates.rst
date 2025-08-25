1. Log in to the Realm UI, and then click :guilabel:`Sync` in the left hand 
   panel.

#. Under :guilabel:`Sync Type`, choose :guilabel:`Flexible`.

#. Set the toggle to enable :guilabel:`Development Mode`.

#. Select the cluster you want to sync.

#. :guilabel:`Define a Database Name`: select :guilabel:`+Add a new
   database` and type a name for the database Realm will use to store your synced
   objects. You can name it anything you want. A common strategy would be to name
   the database after the app you're making.

#. :guilabel:`Select Queryable Fields`: type in ``owner_id``. This allows your 
   permissions expressions (which you'll set next) to use the any fields
   called ``owner_id``.

#. Skip :guilabel:`Advanced Configuration`, and then click :guilabel:`Save
   Changes` to enable Sync.
