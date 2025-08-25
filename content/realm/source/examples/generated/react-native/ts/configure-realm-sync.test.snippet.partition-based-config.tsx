<RealmProvider
  schema={[YourObjectModel]}
  sync={{
    partitionValue: 'testPartition',
  }}>
  <RestOfApp />
</RealmProvider>
