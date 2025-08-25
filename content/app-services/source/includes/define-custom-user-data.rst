To enable Custom User Data in the App Services UI, follow these steps:

1. Click :guilabel:`App Users` in the left hand panel.

#. Select the :guilabel:`User Settings` tab and find the
   :guilabel:`Custom User Data` section.

#. Set the :guilabel:`Enable Custom User Data` toggle to :guilabel:`On`.

#. Specify the following values:

   - :guilabel:`Cluster Name`: The name of a linked MongoDB cluster
     that will contain the custom user data database.
   
   - :guilabel:`Database Name`: The name of the MongoDB database that 
     will contain the custom user data collection.
   
   - :guilabel:`Collection Name`: The name of the MongoDB collection that
     will contain custom user data.

#.  Specify the User ID field.
    Every document in the custom user data collection must have a field that
    maps to a specific user. The field must be present in every
    document that maps to a user, and must contain the user's ID *as a string*. 
    We recommend that you use the standard ``_id`` field to store the 
    user ID. MongoDB automatically places a constraint on the ``_id`` field, 
    ensuring uniqueness.
    
    .. note::
        
       If two documents in this collection contain the same user ID value, 
       App Services uses the first document that matches, which 
       leads to unexpected results.
     
#. Save and deploy the changes.

   .. note:: Restart the Sync Session after Updating Custom User Data

    The sync server caches custom user data for the duration of the session.
    As a result, you must restart the sync session after updating custom user data
    to avoid a :ref:`compensating write error <flexible-sync-errors>`. 
    To restart the sync session, pause and resume all open Sync Sessions in the client application.
    For more information on pausing and resuming sync from the client SDKs, see your preferred SDK:

    - :ref:`Pause or resume a Device Sync session - Flutter SDK
      <flutter-pause-resume-sync>`
    - :ref:`Pause or resume a Device Sync session - Kotlin SDK 
      <kotlin-pause-resume-sync>`
    - :ref:`Pause or resume a Device Sync session - Java SDK
      <java-pause-or-resume-a-sync-session>`
    - :ref:`Pause or resume a Device Sync session - .Net SDK
      <dotnet-pause-or-resume-a-sync-session>`
    - :ref:`Pause or resume a Device Sync session - Node SDK
      <node-pause-or-resume-a-sync-session>`
    - :ref:`Pause or resume a Device Sync session - React Native SDK
      <react-native-pause-or-resume-a-sync-session>`
    - :ref:`Pause or resume a Device Sync session - Swift SDK
      <ios-suspend-or-resume-a-sync-session>`
       