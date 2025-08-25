realm.write(() => {
  // Deleting the contact will delete the embedded address of that contact
  realm.delete(
    realm.objects("Contact").filtered("name = 'Philip Sherman'")
  );
});
