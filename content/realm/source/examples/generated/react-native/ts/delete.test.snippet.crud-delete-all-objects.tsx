const DeleteProfileSettingsScreen = () => {
  const realm = useRealm();

  const deleteAllData = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  return (
    <>
      <Text>Delete all data in your profile:</Text>
      <Button
        onPress={deleteAllData}
        title='Delete all data'
      />
    </>
  );
};
