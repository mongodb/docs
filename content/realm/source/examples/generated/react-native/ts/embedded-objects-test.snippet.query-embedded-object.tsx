const ContactList = ({postalCode}: {postalCode: string}) => {
  // Run the `.filtered()` method on all Contact objects to get
  // contacts with a specific postal code.
  const contactsInArea = useQuery(Contact, contacts => {
    return contacts.filtered(`address.postalCode == '${postalCode}'`);
  });

  if (contactsInArea.length) {
    return (
      <>
        <FlatList
          data={contactsInArea}
          renderItem={({item}) => {
            <Text>{item.name}</Text>;
          }}
        />
      </>
    );
  } else {
    return <Text>No contacts found in this area.</Text>;
  }
};
