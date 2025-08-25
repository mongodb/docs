type ContactInfoProps = {
  contactCity: string;
  postalCode: string;
};

const ContactInfo = ({contactCity, postalCode}: ContactInfoProps) => {
  const parentsToDelete = useQuery(Contact, contacts => {
    return contacts.filtered(`address.city == '${contactCity}'`);
  });
  const embeddedToDelete = useQuery(Contact, contacts => {
    return contacts.filtered(`address.postalCode == '${postalCode}'`);
  });
  const realm = useRealm();

  const deleteParentObject = () => {
    realm.write(() => {
      // Delete all objects that match the filter.
      // Also deletes embedded objects.
      realm.delete(parentsToDelete);
    });
  };

  const deleteEmbeddedObject = () => {
    realm.write(() => {
      embeddedToDelete.forEach(contact => {
        // Delete just the embedded object.
        realm.delete(contact.address);
      });
    });
  };

  return (
    <View>
      <Text testID='contactCityText'>{contactCity}</Text>
      <Button
        onPress={deleteParentObject}
        title='Delete Contact'
      />
      <Button
        onPress={deleteEmbeddedObject}
        title='Delete Address'
      />
    </View>
  );
};
