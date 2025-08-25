.. important:: Deleting a User Doesn't Delete User Metadata

   Deleting a user only deletes the user object, which may contain associated 
   metadata. This does not delete :ref:`custom user data <custom-user-data>`
   or user-entered data from your application. 
   `Google <https://support.google.com/googleplay/android-developer/answer/13316080?sjid=9059006274298096173-NA#account_deletion>`__ 
   and :apple:`Apple <app-store/review/guidelines/#5.1.1>` require 
   that you disclose data retention and deletion policies to your 
   application customers and give them a way to request user data deletion.
   If you collect additional user data, you must implement your own methods 
   or processes to delete that data.
