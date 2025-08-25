To open a synced realm, call 
:java-sdk:`getInstanceAsync()
<io/realm/Realm.html#getInstanceAsync-io.realm.RealmConfiguration-io.realm.Realm.Callback->`, 
passing in a :java-sdk:`SyncConfiguration <io/realm/mongodb/sync/SyncConfiguration.html>` 
object. The following code demonstrates how to create a realm with 
specific sync settings created using a ``SyncConfiguration`` object:

.. tabs-realm-languages::
   
   .. tab::
       :tabid: kotlin

       .. literalinclude:: /examples/generated/java/sync/OpenARealmTest.snippet.allow-reads-writes-ui-thread.kt
         :language: kotlin
         :copyable: false

   .. tab::
       :tabid: java

       .. literalinclude:: /examples/generated/java/sync/OpenARealmTest.snippet.allow-reads-writes-ui-thread.java
         :language: java
         :copyable: false

The code above shows how to open the realm *asynchronously* 
by using :java-sdk:`getInstanceAsync()
<io/realm/Realm.html#getInstanceAsync-io.realm.RealmConfiguration-io.realm.Realm.Callback->`. 
You can also open a realm synchronously by using :java-sdk:`getInstance()
<io/realm/Realm.html#getInstance-io.realm.RealmConfiguration->`, which
returns an open realm before synchronizing all data from the backend.
However, this may lead to temporary data inconsistencies while the
remote data is downloaded, and is generally not recommended. You can
use the :java-sdk:`waitForInitialRemoteData() <io/realm/mongodb/sync/SyncConfiguration.Builder.html#waitForInitialRemoteData-->`
configuration option to force the SDK to fetch remote data before
opening the realm to avoid these inconsistencies.

The :ref:`partition value <partition-value>` specifies which subset of your data to sync.
This is typically a user ID, project ID, store ID, or some other category identifier in
your app that has particular relevance to the current user. 
