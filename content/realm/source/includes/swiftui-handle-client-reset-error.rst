Handle Client Reset Errors
--------------------------

A client reset error is a specific type of Sync error that occurs when the 
realm on the user's device can no longer sync with the App Services App. 
For more information about the underlying error and recovery options, 
refer to: :ref:`ios-client-reset`.

Realm's SwiftUI property wrappers ``@AsyncOpen`` and ``@AutoOpen`` enable
you to handle a client reset error by adding a few things to your app:

- Add client reset handling information to the :swift-sdk:`flexibleSyncConfiguration() 
  <Extensions/User.html#/s:So7RLMUserC10RealmSwiftE25flexibleSyncConfigurationAC0B0V0F0VyF>`
- Force an ``@AsyncOpen`` or ``@AutoOpen`` view to reload after a client reset is complete

Add Client Reset Handling Information to the Flexible Sync Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Swift SDK can handle a client reset with different behaviors depending
on the needs of your app. For a full list of client reset modes and behaviors,
refer to :ref:`ios-client-resets`.

To automatically handle a client reset, set the ``clientResetMode`` parameter 
in your :swift-sdk:`flexibleSyncConfiguration() 
<Extensions/User.html#/flexibleSyncConfiguration(clientResetMode:cancelAsyncOpenOnNonFatalErrors:)>`.

You can review the possible values and their behaviors in the 
:swift-sdk:`ClientResetMode enum <Enums/ClientResetMode.html>`.

In this example, we set the ``clientResetMode`` to ``.recoverUnsyncedChanges``.
.. include:: /examples/generated/swiftui/Authenticate.snippet.flexible-sync-view-with-client-reset-handling.swift.rst

Take Some Action after the Client Reset Completes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the Sync error handler detects that a client reset must occur, the SDK 
executes the client reset using the behavior you specify in the 
``flexibleSyncConfiguration``'s ``clientResetMode`` parameter. However, the 
SwiftUI ``@AsyncOpen`` and ``@AutoOpen`` property wrappers do not detect 
that a client reset has occurred. An app that :ref:`opens a synced realm by 
switching on @AsyncOpen or @AutoOpen property wrapper states 
<ios-open-synced-realm-swiftui>` displays a progress spinner indefinitely. 
It never progresses past the ``.connecting`` state. The next time the user 
opens the app, it loads without issue.

You can perform additional logic in the ``afterClientReset`` block to handle 
this in your app. You could set a ``@State`` variable, modify its value 
in the ``afterClientResetBlock``, and use that to instruct the user to 
re-open the app when a client reset occurs. Or you could force the 
``@AsyncOpen`` or ``@AutoOpen`` view to reload using the updated realm.

Verify Client Reset Works as Expected
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To test that your client reset implementation is working, you trigger
a client reset by terminating and re-enabling Device Sync.

.. warning::

   Test client reset handling in a development app that does not have 
   external users. Triggering a client reset using this method causes a 
   client reset for *all* app users.

.. procedure::

   .. step:: Run the App and Add Data

      Open your app on the device. Add some data to your app. Then, stop your 
      app.

   .. step:: Trigger a Client Reset

      Follow the instructions in the Device Sync documentation to 
      :ref:`terminating-realm-sync`. You should see a 
      ``TranslatorFatalError Error`` message in the App Services logs, 
      indicating that Sync has terminated. Then, :ref:`re-enable-realm-sync`. 

   .. step:: Run and Test the App

      When you run the app on your device again, it should trigger a 
      client reset error. Verify that you see any relevant log messages 
      that you added to your code while implementing the client reset logic, 
      and that the device resets the realm and successfully loads fresh data 
      from the backend.

   .. step:: Iterate as Needed

      Repeat until you are satisfied with the client reset implementation in your
      SwiftUI app.
