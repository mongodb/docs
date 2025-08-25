/* eslint-disable @typescript-eslint/no-unused-vars */
import {useCallback} from 'react';
import {SafeAreaView, View, StyleSheet, Button} from 'react-native';
import Realm from 'realm';
import IntroText from './components/IntroText';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import colors from './styles/colors';
import SampleTask from './components/SampleTask';
import {appId} from '../realm.json';

const app = new Realm.App({id: appId});

// :snippet-start: get-access-to-the-hooks
import TaskContext, {Task} from './models/Task';

const {useRealm, useQuery, useObject} = TaskContext;
// :snippet-end:

function App() {
  // :snippet-start: example-usequery-hook-usage
  const tasks = useQuery('Task');
  // :uncomment-start:

  //return (
  //  <TaskList tasks={tasks} />
  //);

  // :uncomment-end:
  // :snippet-end:

  // :snippet-start: example-userealm-hook-usage
  const realm = useRealm();
  const handleAddTask = useCallback(
    (description: string): void => {
      if (!description) {
        return;
      }
      realm.write(() => {
        realm.create('Task', Task.generate(description));
      });
    },
    [realm],
  );
  // :snippet-end:

  const handleToggleTaskStatus = useCallback(
    (task: Task): void => {
      realm.write(() => {
        task.isComplete = !task.isComplete;
      });
    },
    [realm],
  );

  const handleDeleteTask = useCallback(
    (task: Task): void => {
      realm.write(() => {
        realm.delete(task);
      });
    },
    [realm],
  );
  const firstUser = realm.objects('Task')[0];

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <AddTaskForm onSubmit={handleAddTask} />
        {tasks.length === 0 ? (
          <IntroText />
        ) : (
          <TaskList
            onToggleTaskStatus={handleToggleTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        )}
        {firstUser ? <SampleTask _id={firstUser._id} /> : null}
        <Button title="Log Out" onPress={() => app?.currentUser?.logOut()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default App;
