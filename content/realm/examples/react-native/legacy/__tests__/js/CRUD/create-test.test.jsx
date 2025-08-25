import React, {useEffect, useState} from 'react';
import {Button, TextInput, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

const PERSON_ID = new Realm.BSON.ObjectId();
const PETOWNER_ID = new Realm.BSON.ObjectId();
const PET_ID = new Realm.BSON.ObjectId();
const EMPLOYEE_ID_1 = new Realm.BSON.ObjectId();
const EMPLOYEE_ID_2 = new Realm.BSON.ObjectId();
const EMPLOYEE_ID_3 = new Realm.BSON.ObjectId();
const COMPANY_ID = new Realm.BSON.ObjectID();

/*** Schemas & Config ***/
// :snippet-start: create-object-schema
class Person extends Realm.Object {
  static schema = {
    name: 'Person',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int?',
    },
  };
}
// :snippet-end:

// :snippet-start: create-to-one-schema
class Pet extends Realm.Object {
  static schema = {
    name: 'Pet',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
      animalType: 'string?',
    },
  };
}

class PetOwner extends Realm.Object {
  static schema = {
    name: 'PetOwner',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
      pet: 'Pet?',
    },
  };
}
// :snippet-end:

// :snippet-start: create-to-many-schema
class Employee extends Realm.Object {
  static schema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthdate: 'date',
    },
  };
}

class Company extends Realm.Object {
  static schema = {
    name: 'Company',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      employees: {
        type: 'list',
        objectType: 'Employee',
        optional: false,
      },
    },
  };
}
// :snippet-end:

const realmConfig = {
  schema: [Person, Pet, PetOwner, Employee, Company],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useQuery, useObject} =
  createRealmContext(realmConfig);

/*** Creating Object ***/
const CreatePersonInput = () => {
  const [name, setName] = useState('Jane');
  const realm = useRealm();
  const testPerson = useObject(Person, PERSON_ID);

  const handleAddPerson = () => {
    realm.write(() => {
      realm.create('Person', {_id: PERSON_ID, name: name, age: 25});
    });
  };

  if (testPerson) {
    expect(testPerson.name).toBe('Jane');
  }

  console.debug(performance.now(), 'person name: ' + testPerson?.name);

  return (
    <>
      <TextInput onChangeText={setName} value={name} />
      <Text>{testPerson ? testPerson.name : 'no Person'}</Text>
      <Button
        onPress={() => handleAddPerson()}
        title='Add Person'
        testID='handleAddPersonBtn'
      />
    </>
  );
};

/*** Creating To-One Object ***/
const CreatePetOwnerInput = () => {
  const [ownerName, setOwnerName] = useState('Jane');
  const realm = useRealm();
  const newPet = useObject(Pet, PET_ID);
  const newPetOwner = useObject(PetOwner, PETOWNER_ID);

  const handleAddPetOwner = () => {
    // Create a new Pet Owner object, pass new Pet object in pet field
    realm.write(() => {
      realm.create('PetOwner', {
        _id: PETOWNER_ID,
        name: ownerName,
        age: 25,
        pet: newPet,
      });
    });
  };

  return (
    <>
      <TextInput onChangeText={setOwnerName} value={ownerName} />
      <Text>{newPetOwner ? newPetOwner.name : 'no pet owner '}</Text>
      <Button
        onPress={() => handleAddPetOwner()}
        title='Add New Pet Owner'
        testID='handleAddPetOwnerBtn'
      />
    </>
  );
};

/*** Creating To-Many Object ***/
const CreateNewCompanyInput = () => {
  const employees = useQuery(Employee);
  const [companyName, setCompanyName] = useState('Dunder Mifflin');
  const realm = useRealm();
  const newCompany = useObject(Company, COMPANY_ID);

  // Create a new Company and connect our list of Employees to it
  const handleCreateCompany = () => {
    realm.write(() => {
      realm.create('Company', {
        _id: COMPANY_ID,
        name: companyName,
        employees: employees,
      });
    });
  };

  return (
    <>
      <TextInput onChangeText={setCompanyName} value={companyName} />
      <Text>{newCompany ? newCompany.name : 'no company'}</Text>
      <Button
        onPress={() => handleCreateCompany()}
        title='Add New Employee'
        testID='handleAddEmployeeBtn'
      />
    </>
  );
};

/*** Testing ***/

// render an App component, giving components access to the @realm/react hooks:
const App = () => (
  <RealmProvider>
    <CreatePersonInput />
    <CreatePetOwnerInput />
    <CreateNewCompanyInput />
  </RealmProvider>
);

describe('Sync Data Unidirectionally from a Client App', () => {
  let assertionRealm;

  beforeEach(async () => {
    // We will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // Delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.deleteAll();
    });

    // Create a new Pet object
    assertionRealm.write(() => {
      assertionRealm.create('Pet', {
        _id: PET_ID,
        name: 'Fido',
        age: 1,
        animalType: 'Dog',
      });
    });

    // Create some Employee objects
    assertionRealm.write(() => {
      assertionRealm.create('Employee', {
        _id: EMPLOYEE_ID_1,
        name: 'Angela Martin',
        birthdate: new Date('1971-6-25'),
      });

      assertionRealm.create('Employee', {
        _id: EMPLOYEE_ID_2,
        name: 'Jim Hayes',
        birthdate: new Date('1974-2-20'),
      });

      assertionRealm.create('Employee', {
        _id: EMPLOYEE_ID_3,
        name: 'Dwight Schrute',
        birthdate: new Date('1970-10-11'),
      });
    });
  });

  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });

  test('Create a New Object', async () => {
    const {findByTestId, findByText} = render(<App />);

    // get the "Add Person" button
    const handleAddPersonBtn = await findByTestId('handleAddPersonBtn');

    // press the "Add Person" button
    await act(async () => {
      fireEvent.press(handleAddPersonBtn);
    });

    // verifying object creation via text component
    const renderedName = await findByText('Jane');
    expect(renderedName).toBeTruthy();

    // check if the new Person object has been created
    const newPerson = assertionRealm
      .objects(Person)
      .filtered('_id == $0', PERSON_ID)[0];

    // check if new Person object has correct properties
    expect(newPerson._id).toEqual(PERSON_ID);
    expect(newPerson.name).toBe('Jane');
    expect(newPerson.age).toBe(25);
  });

  test('Create an Obj with To-One Relationship', async () => {
    const {findByTestId, findByText} = render(<App />);

    // get the "Add Pet Owner" button
    const handleAddPetOwnerBtn = await findByTestId('handleAddPetOwnerBtn');

    //press the "Add Pet Owner" button
    await act(async () => {
      fireEvent.press(handleAddPetOwnerBtn);
    });

    // verifying object creation via text component
    const renderedName = await findByText('Jane');
    expect(renderedName).toBeTruthy();

    //check if the new Pet & Pet Owner objects have been created
    const newPetOwner = assertionRealm
      .objects(PetOwner)
      .filtered('_id == $0', PETOWNER_ID)[0];
    const newPet = assertionRealm.objects(Pet).filtered('_id == $0', PET_ID)[0];

    // check if new Person object has correct properties
    expect(newPetOwner._id).toEqual(PETOWNER_ID);
    expect(newPetOwner.name).toBe('Jane');
    expect(newPetOwner.age).toBe(25);
    expect(newPet._id).toEqual(PET_ID);
    expect(newPet.name).toBe('Fido');
    expect(newPet.age).toBe(1);
  });

  test('Create an Obj with To-Many Relationship', async () => {
    const {findByTestId, findByText} = render(<App />);

    // get & press the "Add Employee" button
    const handleAddEmployeeBtn = await findByTestId('handleAddEmployeeBtn');
    await act(async () => {
      fireEvent.press(handleAddEmployeeBtn);
    });

    // verifying object creation via text component
    const renderedName = await findByText('Dunder Mifflin');
    expect(renderedName).toBeTruthy();

    //check if the new Company and Employee objects has been created
    const newCompany = assertionRealm
      .objects(Company)
      .filtered('_id == $0', COMPANY_ID)[0];
    const newEmployee1 = assertionRealm
      .objects(Employee)
      .filtered('_id == $0', EMPLOYEE_ID_1)[0];
    const newEmployee2 = assertionRealm
      .objects(Employee)
      .filtered('_id == $0', EMPLOYEE_ID_2)[0];
    const newEmployee3 = assertionRealm
      .objects(Employee)
      .filtered('_id == $0', EMPLOYEE_ID_3)[0];

    // check if new Company and Employee objects correct properties
    expect(newCompany._id).toEqual(COMPANY_ID);
    expect(newCompany.name).toBe('Dunder Mifflin');

    expect(newEmployee1._id).toEqual(EMPLOYEE_ID_1);
    expect(newEmployee2._id).toEqual(EMPLOYEE_ID_2);
    expect(newEmployee3._id).toEqual(EMPLOYEE_ID_3);
  });
});
