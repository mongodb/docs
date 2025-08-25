import React, {useState} from 'react';
import {Button, TextInput, View, Text, FlatList} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Address from '../../Models/Address';
import Contact from '../../Models/Contact';

const primaryKeys = {
  contact1: new Realm.BSON.ObjectID(),
  contact2: new Realm.BSON.ObjectID(),
  contact3: new Realm.BSON.ObjectID(),
};

const realmConfig = {
  schema: [Address, Contact],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useQuery, useObject, useRealm} =
  createRealmContext(realmConfig);

let assertionRealm: Realm;

// test describe block for the embedded objects page
describe('embedded objects tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(Contact));

      assertionRealm.create('Contact', {
        name: 'John Smith',
        _id: primaryKeys.contact1,
        address: {
          street: '3731 Hummingbird Way',
          city: 'Hays',
          country: 'USA',
          postalCode: '67601',
        },
      });

      assertionRealm.create('Contact', {
        name: 'Jane Doe',
        _id: primaryKeys.contact2,
        address: {
          street: '3871 Sigley Road',
          city: 'Hays',
          country: 'USA',
          postalCode: '67601',
        },
      });

      assertionRealm.create('Contact', {
        name: 'Arthur Dent',
        _id: primaryKeys.contact3,
        address: {
          street: '4226 Timber Oak Drive',
          city: 'Cambria',
          country: 'USA',
          postalCode: '93428',
        },
      });
    });
  });

  afterAll(() => {
    // close realm
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });

  it('should create and read an embedded object', async () => {
    // :snippet-start: create-embedded-object
    // :replace-start: {
    //  "terms": {
    //   "LeBron James": "",
    //   "1 Goat Drive": "",
    //   "Cleveland": "",
    //   "USA": "",
    //   "12345": ""
    //   }
    // }
    const CreateContact = () => {
      const [name, setContactName] = useState('LeBron James');
      const [street, setStreet] = useState('1 Goat Drive');
      const [city, setCity] = useState('Cleveland');
      const [country, setCountry] = useState('USA');
      const [postalCode, setPostalCode] = useState('12345');
      const realm = useRealm();

      const submitContact = () => {
        // Create a Contact within a write transaction
        realm.write(() => {
          // Create an embedded Address object
          const address = {
            street,
            city,
            country,
            postalCode,
          };

          realm.create('Contact', {
            _id: new Realm.BSON.ObjectID(),
            name,
            // Embed the address in the Contact object
            address,
          });
        });
      };
      return (
        <View>
          <TextInput value={name} onChangeText={text => setContactName(text)} />
          <TextInput value={street} onChangeText={text => setStreet(text)} />
          <TextInput value={city} onChangeText={text => setCity(text)} />
          <TextInput value={country} onChangeText={text => setCountry(text)} />
          <TextInput
            value={postalCode}
            onChangeText={text => setPostalCode(text)}
          />
          <Button
            title='Submit Contact'
            testID='submitContactBtn' // :remove:
            onPress={submitContact}
          />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <CreateContact />
      </RealmProvider>
    );
    const {findByTestId} = render(<App />);
    const submitContactBtn = await waitFor(
      () => findByTestId('submitContactBtn'),
      {
        timeout: 5000,
      },
    );

    await act(async () => {
      fireEvent.press(submitContactBtn);
    });

    // check if the new Contact object has been created
    const contact = assertionRealm
      .objects(Contact)
      .filtered("name == 'LeBron James'")[0];

    expect(contact.name).toBe('LeBron James');
    expect(contact.address.street).toBe('1 Goat Drive');
    expect(contact.address.city).toBe('Cleveland');
    expect(contact.address.country).toBe('USA');
    expect(contact.address.postalCode).toBe('12345');
  });

  it('should query for an embedded object', async () => {
    let higherScopedContactsInArea;
    // :snippet-start: query-embedded-object
    const ContactList = ({postalCode}: {postalCode: string}) => {
      // Run the `.filtered()` method on all Contact objects to get
      // contacts with a specific postal code.
      const contactsInArea = useQuery(Contact, contacts => {
        return contacts.filtered(`address.postalCode == '${postalCode}'`);
      });
      higherScopedContactsInArea = contactsInArea; // :remove:

      if (contactsInArea.length) {
        return (
          <>
            <FlatList
              testID='contactsList' // :remove:
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
    // :snippet-end:
    const App = () => (
      <RealmProvider>
        <ContactList postalCode='67601' />
      </RealmProvider>
    );

    const {findByTestId} = render(<App />);

    // Wait for app to render. It's rendered when we can find
    // `contactsList`.
    const contactsList = await findByTestId('contactsList');

    expect(higherScopedContactsInArea.length).toBe(2);
  });

  it('should delete an embedded object', async () => {
    // :snippet-start: delete-embedded-object
    // :replace-start: {
    //  "terms": {
    //   " testID='contactNameText'": ""
    //   }
    // }
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
            testID='deleteContactBtn' // :remove:
            onPress={deleteParentObject}
            title='Delete Contact'
          />
          <Button
            testID='deleteAddressBtn' // :remove:
            onPress={deleteEmbeddedObject}
            title='Delete Address'
          />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <ContactInfo contactCity='Cambria' postalCode='67601' />
      </RealmProvider>
    );

    const {findByTestId} = render(<App />);

    // Wait for app to render
    const contactNameText = await findByTestId('contactCityText');

    expect(contactNameText.props.children).toBe('Cambria');

    const deleteContactBtn = await findByTestId('deleteContactBtn');
    const deleteAddressBtn = await findByTestId('deleteAddressBtn');

    await act(async () => {
      fireEvent.press(deleteContactBtn);
      fireEvent.press(deleteAddressBtn);
    });

    // check if the new Contact object has been deleted
    const contacts = assertionRealm.objects(Contact);

    expect(contacts.length).toBe(2);
    expect(contacts[0].address).toBe(null);
  });

  it('should update an embedded object', async () => {
    // :snippet-start: update-embedded-object
    // :replace-start: {
    //  "terms": {
    //   "3 jefferson lane": ""
    //   }
    // }
    // Find the contact you want to update
    const UpdateContact = ({contactId}: {contactId: Realm.BSON.ObjectId}) => {
      const [street, setStreet] = useState('3 jefferson lane');
      const contact = useObject(Contact, contactId);
      const realm = useRealm();

      const updateStreet = () => {
        // Modify the property of the embedded Address object in a write transaction
        realm.write(() => {
          // Update the address directly through the contact
          contact!.address.street = street;
        });
      };

      return (
        <View>
          <Text>{contact!.name}</Text>
          <TextInput
            value={street}
            onChangeText={setStreet}
            placeholder='Enter New Street Address'
          />
          <Button
            testID='updateContactBtn' // :remove:
            onPress={updateStreet}
            title='Update Street Address'
          />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <UpdateContact contactId={primaryKeys.contact1} />
      </RealmProvider>
    );

    const {findByTestId} = render(<App />);
    const updateContactBtn = await findByTestId('updateContactBtn');

    await act(async () => {
      fireEvent.press(updateContactBtn);
    });

    // check if the new Contact object has been updated
    const contact = assertionRealm.objectForPrimaryKey(
      Contact,
      primaryKeys.contact1,
    );

    expect(contact!.address.street).toBe('3 jefferson lane');
  });

  it('should overwrite an embedded object', async () => {
    // :snippet-start: overwrite-embedded-object
    // :replace-start: {
    //  "terms": {
    //   "12 Grimmauld Place": "",
    //   "London": "",
    //   "UK": "",
    //   "E1 7AA": ""
    //   }
    // }
    const OverwriteContact = ({
      contactId,
    }: {
      contactId: Realm.BSON.ObjectId;
    }) => {
      const [street, setStreet] = useState('12 Grimmauld Place');
      const [city, setCity] = useState('London');
      const [country, setCountry] = useState('UK');
      const [postalCode, setPostalCode] = useState('E1 7AA');
      const contact = useObject(Contact, contactId);
      const realm = useRealm();

      const updateAddress = () => {
        realm.write(() => {
          // Within a write transaction, overwrite the embedded object with the new address
          const address = {
            street,
            city,
            country,
            postalCode,
          };

          contact!.address = address;
        });
      };

      return (
        <View>
          <Text>{contact!.name}</Text>
          <Text>Enter the new address:</Text>
          <TextInput
            value={street}
            onChangeText={setStreet}
            placeholder='Street'
          />
          <TextInput value={city} onChangeText={setCity} placeholder='City' />
          <TextInput
            value={country}
            onChangeText={setCountry}
            placeholder='Country'
          />
          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder='Postal Code'
          />
          <Button
            testID='overwriteContactBtn' // :remove:
            onPress={updateAddress}
            title='Overwrite Address'
          />
        </View>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <OverwriteContact contactId={primaryKeys.contact1} />
      </RealmProvider>
    );
    const {findByTestId} = render(<App />);
    const overwriteContactBtn = await findByTestId('overwriteContactBtn');

    await act(async () => {
      fireEvent.press(overwriteContactBtn);
    });

    // check if the new Contact object has been overwritten
    const contact = assertionRealm.objectForPrimaryKey(
      Contact,
      primaryKeys.contact1,
    );

    expect(contact!.address.street).toBe('12 Grimmauld Place');
    expect(contact!.address.city).toBe('London');
    expect(contact!.address.country).toBe('UK');
    expect(contact!.address.postalCode).toBe('E1 7AA');
  });
});
