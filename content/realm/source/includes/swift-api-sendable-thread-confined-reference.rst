The Realm Swift SDK public API contains types that fall into three broad
categories:

- Sendable
- Not Sendable and not thread confined
- Thread-confined

You can share types that are not Sendable and not thread confined between
threads, but you must synchronize them.

Thread-confined types, unless frozen, are confined to an isolation context.
You cannot pass them between these contexts even with synchronization.

.. list-table::
   :header-rows: 1

   * - Sendable
     - Non-Sendable
     - Thread-Confined
   * - AnyBSON
     - RLMAppConfiguration
     - AnyRealmCollection
   * - AsyncOpen
     - RLMFindOneAndModifyOptions
     - AnyRealmValue
   * - AsyncOpenSubscription
     - RLMFindOptions
     - List
   * - RLMAPIKeyAuth
     - RLMNetworkTransport
     - Map
   * - RLMApp
     - RLMRequest
     - MutableSet
   * - RLMAsyncOpenTask
     - RLMResponse
     - Projection
   * - RLMChangeStream
     - RLMSyncConfiguration
     - RLMArray
   * - RLMCompensatingWriteInfo
     - RLMSyncTimeoutOptions
     - RLMChangeStream
   * - RLMCredentials
     - 
     - RLMDictionary
   * - RLMDecimal128
     - 
     - RLMDictionaryChange
   * - RLMEmailPasswordAuth
     -
     - RLMEmbeddedObject
   * - RLMMaxKey
     - 
     - RLMLinkingObjects
   * - RLMMinKey
     - 
     - RLMObject
   * - RLMMongoClient
     -
     - RLMPropertyChange
   * - RLMMongoCollection
     - 
     - RLMRealm
   * - RLMMongoDatabase
     - 
     - RLMResults
   * - RLMObjectId
     -
     - RLMSection
   * - RLMObjectSchema
     -
     - RLMSectionedResults
   * - RLMProgressNotification
     -
     - RLMSectionedResultsChangeset
   * - RLMProgressNotificationToken
     -
     - RLMSet
   * - RLMProperty
     -
     - RLMSyncSubscription
   * - RLMPropertyDescriptor
     -
     - RLMSyncSubscriptionSet
   * - RLMProviderClient
     -
     - RealmOptional
   * - RLMPushClient
     -
     - RealmProperty
   * - RLMSchema
     -
     -
   * - RLMSortDescriptor
     -
     -
   * - RLMSyncErrorActionToken
     -
     -
   * - RLMSyncManager
     -
     -
   * - RLMSyncSession
     -
     -
   * - RLMThreadSafeReference
     -
     -
   * - RLMUpdateResult
     -
     -
   * - RLMUser
     -
     -
   * - RLMUserAPIKey
     -
     -
   * - RLMUserIdentity
     -
     -
   * - RLMUserProfile
     -
     -
   * - ThreadSafe
     -
     -
