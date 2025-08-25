import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import Realm from 'realm';
// :snippet-start: using-change-listeners-functional-component
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  // :emphasize-start:
  useEffect(() => {
  // :emphasize-end:
    Realm.open({
      schema: [TaskSchema], // predefined schema
    }).then(realm => {

      const tasks = realm.objects('Task');
      // set state to the initial value of your realm objects
      setTasks([...tasks]);

      try{
      // :emphasize-start:
        tasks.addListener(() => {
          // update state of tasks to the updated value
          setTasks([...tasks]);
        });
      // :emphasize-end:
      }
      catch (error) {
        console.error(
          `Unable to update the tasks' state, an exception was thrown within the change listener: ${error}`
        );
      }
      realm.write(() => {
        // the following tasks will trigger the change listener and update the UI
        realm.create('Task', {
          name: 'Go to the grocery store',
        });
        realm.create('Task', {
          name: 'Exercise in the gym',
        });
      });

      // cleanup function
      // :emphasize-start:
      return () => {
        // Remember to remove the listener when you're done!
        tasks.removeAllListeners();
      // :emphasize-end:
        // Call the close() method when done with a realm instance to avoid memory leaks.
        realm.close();
      };
    });
  }, []);

  return (
    <>
      {tasks.map(task => (
        <Text key={task.name}>{task.name}</Text>
      ))}
    </>
  );
};
// :snippet-end:
export default TaskList;