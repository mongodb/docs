import React from 'react';
import {Button, Text} from 'react-native';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Person from '../Models/Person';
import Task from '../Models/Task';

const realmConfig = {
  schema: [Task, Person],
  deleteRealmIfMigrationNeeded: true,
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

let assertionRealm;

describe('Update Data Tests', () => {
  beforeEach(async () => {
    // we will use this Realm for assertions to access Realm Objects outside of a Functional Component (like required by @realm/react)
    assertionRealm = await Realm.open(realmConfig);

    // delete every object in the realmConfig in the Realm to make test idempotent
    assertionRealm.write(() => {
      assertionRealm.delete(assertionRealm.objects('Task'));

      assertionRealm.create('Task', {
        _id: 92140,
        priority: 4,
        progressMinutes: 0,
        name: 'Paint the walls',
      });

      assertionRealm.create('Task', {
        _id: 87432,
        priority: 2,
        progressMinutes: 0,
        name: 'Complete math homework',
      });

      assertionRealm.create('Task', {
        _id: 93479,
        priority: 2,
        progressMinutes: 30,
        name: 'Learn spanish',
      });
    });
  });
  afterAll(() => {
    if (!assertionRealm.isClosed) {
      assertionRealm.close();
    }
  });
  it('should update an object', async () => {
    // :snippet-start: crud-update-object
    // :replace-start: {
    //  "terms": {
    //   " testID='progressMinutes'": ""
    //   }
    // }
    const TaskItem = ({_id}) => {
      const realm = useRealm();
      const myTask = useObject(Task, _id);

      const incrementTaskProgress = () => {
        if (myTask) {
          realm.write(() => {
            myTask.progressMinutes += 1;
          });
        }
      };
      if (myTask) {
        return (
          <>
            <Text>Task: {myTask.name}</Text>
            <Text>Progress made (in minutes):</Text>
            <Text testID='progressMinutes'>{myTask.progressMinutes}</Text>
            <Button
              onPress={() => incrementTaskProgress()}
              title='Increment Task Progress'
              testID='handleIncrementBtn' // :remove:
            />
          </>
        );
      } else {
        return <></>;
      }
    };
    // :replace-end:
    // :snippet-end:

    // render an App component, giving the CreateDogInput component access to the @realm/react hooks:
    const App = () => (
      <RealmProvider>
        <TaskItem _id={92140} />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    const handleIncrementBtn = await waitFor(() =>
      getByTestId('handleIncrementBtn'),
    );
    const progressMinutesText = await waitFor(() =>
      getByTestId('progressMinutes'),
    );

    const paintTask = assertionRealm.objectForPrimaryKey(Task, 92140);

    // Test that the initial progress value in the realm and in the UI is 0 minutes
    expect(paintTask.progressMinutes).toBe(0);
    expect(progressMinutesText.children.toString()).toBe('0');

    fireEvent.press(handleIncrementBtn);

    await waitFor(() => {
      expect(progressMinutesText.children.toString()).toBe('1');
    });

    // Test that the  progress value in the realm and in the UI after incrementing is 1 minutes
    expect(paintTask.progressMinutes).toBe(1);
    expect(progressMinutesText.children.toString()).toBe('1');
  });

  it('should upsert an object', async () => {
    // :snippet-start: crud-upsert-object
    // :replace-start: {
    //  "terms": {
    //   " testID='progressMinutes'": ""
    //   }
    // }
    const CreateTaskItem = () => {
      const realm = useRealm();

      let myTask;
      realm.write(() => {
        // Add a new Task to the realm. Since no task with ID 1234
        // has been added yet, this adds the instance to the realm.
        myTask = realm.create(
          'Task',
          {_id: 1234, name: 'Wash the car', progressMinutes: 0},
          'modified',
        );

        // If an object exists, setting the third parameter (`updateMode`) to
        // "modified" only updates properties that have changed, resulting in
        // faster operations.
        myTask = realm.create(
          'Task',
          {_id: 1234, name: 'Wash the car', progressMinutes: 5},
          'modified',
        );
      });
      return (
        <>
          <Text>{myTask.name}</Text>
          <Text>Progress made (in minutes):</Text>
          <Text testID='progressMinutes'>{myTask.progressMinutes}</Text>
        </>
      );
    };
    // :replace-end:
    // :snippet-end:

    const App = () => (
      <RealmProvider>
        <CreateTaskItem />
      </RealmProvider>
    );
    const {getByTestId} = render(<App />);

    const progressMinutesText = await waitFor(
      () => getByTestId('progressMinutes'),
      {timeout: 5000},
    );
    const carWashTask = assertionRealm.objectForPrimaryKey(Task, 1234);

    // Test that the the 'Wash the car' task was upserted, and progressMinutesText is now displaying 5 minutes progressed
    expect(progressMinutesText.children.toString()).toBe('5');
    expect(carWashTask.progressMinutes).toBe(5);
  });
});
