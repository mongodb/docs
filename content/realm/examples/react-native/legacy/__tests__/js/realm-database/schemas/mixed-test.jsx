import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Cat from '../../Models/Cat';

jest.setTimeout(30000);

const realmConfig = {
  schema: [Cat],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useQuery} = createRealmContext(realmConfig);

let assertionRealm: Realm;

describe('Mixed Tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects(Cat));

      assertionRealm.create('Cat', {
        name: 'Clover',
        birthDate: new Date('January 21, 2016'),
      });
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should create an object with a mixed value', async () => {
    // :snippet-start: create-mixed-object
    // :replace-start: {
    //  "terms": {
    //   " testID='catItem'": ""
    //   }
    // }
    const CreateCatsInput = () => {
      const realm = useRealm();

      useEffect(() => {
        // Add data to the Realm when the component mounts
        realm.write(() => {
          // create a Cat with a birthDate value of type string
          realm.create('Cat', {
            name: 'Euler',
            birthDate: 'December 25th, 2017',
          });

          // create a Cat with a birthDate value of type date
          realm.create('Cat', {
            name: 'Blaise',
            birthDate: new Date('August 17, 2020'),
          });

          // create a Cat with a birthDate value of type int
          realm.create('Cat', {name: 'Euclid', birthDate: 10152021});

          // create a Cat with a birthDate value of type null
          realm.create('Cat', {name: 'Pythagoras', birthDate: null});
        });
      }, []);

      // retrieve all cats
      const cats = useQuery(Cat);

      return (
        <>
          {cats.map(cat => (
            <View testID='catItem'>
              <Text>{cat.name}</Text>
              <Text>{String(cat.birthDate)}</Text>
            </View>
          ))}
        </>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <CreateCatsInput />
      </RealmProvider>
    );

    const {getAllByTestId} = render(<App />);

    // Test that 5 Cat Items have been added to the UI,
    // and 5 matching Cat objects have been created in the assertionRealm
    // (since there was already 1 cat object 'clover' created in the beforeEach)
    // + the 4 new Cats
    await waitFor(
      async () => {
        const catItems = await getAllByTestId('catItem');
        expect(catItems.length).toBe(5);
        const cats = assertionRealm.objects(Cat);
        expect(cats.length).toBe(5);
      },
      {timeout: 5500},
    );
  });
  it('should query for objects with a mixed value', async () => {
    // :snippet-start: query-mixed-object
    // :replace-start: {
    //  "terms": {
    //   " testID='catBirthDate'": ""
    //   }
    // }
    const CatInfoCard = ({catName}) => {
      // To query for the cat's birthDate, filter for their name to retrieve the realm object.
      // Use dot notation to access the birthDate property.
      const cat = useQuery(
        Cat,
        cats => {
          return cats.filtered(`name = '${catName}'`);
        },
        [catName],
      )[0];
      const catBirthDate = cat.birthDate;

      if (cat) {
        return (
          <>
            <Text>{catName}</Text>
            <Text testID='catBirthDate'>{String(catBirthDate)}</Text>
          </>
        );
      } else {
        return <Text>Cat not found</Text>;
      }
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <CatInfoCard catName='Clover' />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);
    const catBirthDate = await waitFor(() => getByTestId('catBirthDate'));
    // Expect catBirthDate in the UI to be the same value we set in the beforeEach (which is clover's birthday 'January 21, 2016')
    expect(new Date(catBirthDate.props.children)).toStrictEqual(
      new Date('January 21, 2016'),
    );
  });
});
