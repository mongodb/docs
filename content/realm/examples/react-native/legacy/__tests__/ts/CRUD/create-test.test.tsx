import React, {useEffect, useState} from 'react';
import {Button, TextInput, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm, {ObjectSchema} from 'realm';
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
class Person extends Realm.Object<Person> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age?: number;

  static schema: ObjectSchema = {
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
class Pet extends Realm.Object<Pet> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age!: number;
  animalType!: string;

  static schema: ObjectSchema = {
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

class PetOwner extends Realm.Object<PetOwner> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age?: number;
  pet?: Pet;

  static schema: ObjectSchema = {
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
class Employee extends Realm.Object<Employee> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  birthdate!: Date;

  static schema: ObjectSchema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      birthdate: 'date',
    },
  };
}

class Company extends Realm.Object<Company> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  employees!: Realm.List<Employee>;

  static schema: ObjectSchema = {
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

// :snippet-start: crud-create-object
// :replace-start: {
//  "terms": {
//   "testID='nameInput'": ""
//  }
// }
const CreatePersonInput = () => {
  const [name, setName] = useState('');
  const realm = useRealm();
  const testPerson = useObject(Person, PERSON_ID); // :remove:

  const handleAddPerson = () => {
    realm.write(() => {
      realm.create('Person', {_id: PERSON_ID, name: name, age: 25});
    });
  };
  // :remove-start:
  if (testPerson) {
    expect(testPerson.name).toBe('Jane');
  }
  // :remove-end:

  return (
    <>
      <TextInput value={name} onChangeText={setName} testID='nameInput' />
      <Button
        onPress={() => handleAddPerson()}
        title='Add Person'
        testID='handleAddPersonBtn' // :remove:
      />
    </>
  );
};
// :replace-end:
// :snippet-end:

/*** Creating To-One Object ***/
// :snippet-start: crud-create-to-one-object
// :replace-start: {
//  "terms": {
//   "testID='ownerNameInput'": ""
//  }
// }
const CreatePetOwnerInput = () => {
  const [ownerName, setOwnerName] = useState('');
  const realm = useRealm();
  const newPet = useObject(Pet, PET_ID);
  const newPetOwner = useObject(PetOwner, PETOWNER_ID); // :remove:

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
      <TextInput
        onChangeText={setOwnerName}
        value={ownerName}
        testID='ownerNameInput'
      />
      <Button
        onPress={() => handleAddPetOwner()}
        title='Add New Pet Owner'
        testID='handleAddPetOwnerBtn' // :remove:
      />
    </>
  );
};
// :replace-end:
// :snippet-end:

/*** Creating To-Many Object ***/
// :snippet-start: crud-create-to-many-object
// :replace-start: {
//  "terms": {
//   "testID='companyNameInput'": ""
//  }
// }
const CreateNewCompanyInput = () => {
  const employees = useQuery(Employee);
  const [companyName, setCompanyName] = useState('');
  const realm = useRealm();
  const newCompany = useObject(Company, COMPANY_ID); // :remove:

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
      <TextInput
        onChangeText={setCompanyName}
        value={companyName}
        testID='companyNameInput'
      />
      <Button
        onPress={() => handleCreateCompany()}
        title='Add New Company'
        testID='handleAddCompanyBtn' // :remove:
      />
    </>
  );
};
// :replace-end:
// :snippet-end:

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
  let assertionRealm: Realm;

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
    const {findByTestId} = render(<App />);

    const nameInput = await findByTestId('nameInput');
    fireEvent.changeText(nameInput, 'Jane');

    // get the "Add Person" button
    const handleAddPersonBtn = await findByTestId('handleAddPersonBtn');

    // press the "Add Person" button
    await act(async () => {
      fireEvent.press(handleAddPersonBtn);
    });

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
    const {findByTestId} = render(<App />);

    const nameInput = await findByTestId('ownerNameInput');
    fireEvent.changeText(nameInput, 'Jane');

    // get the "Add Pet Owner" button
    const handleAddPetOwnerBtn = await findByTestId('handleAddPetOwnerBtn');

    //press the "Add Pet Owner" button
    await act(async () => {
      fireEvent.press(handleAddPetOwnerBtn);
    });

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
    const {findByTestId} = render(<App />);

    const nameInput = await findByTestId('companyNameInput');
    fireEvent.changeText(nameInput, 'Dunder Mifflin');

    // get & press the "Add Company" button
    const handleAddEmployeeBtn = await findByTestId('handleAddCompanyBtn');
    await act(async () => {
      fireEvent.press(handleAddEmployeeBtn);
    });

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
