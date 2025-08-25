import {View, Text} from 'react-native';
import {useUser} from '@realm/react';
import TaskContext, {Task} from '../models/Task';
const {useObject} = TaskContext;

// :snippet-start: useUser-hook-usage
// :replace-start: {
//   "terms": {
//     "SyncedSampleTask": "SampleTask"
//   }
// }
// :uncomment-start:
// import {useUser} from '@realm/react';
// :uncomment-end:

const SyncedSampleTask = ({_id}) => {
  // Access the logged in user using the useUser hook
  const user = useUser();

  const myTask = useObject(Task, _id);
  return (
    <View>
      <Text>
        The task {myTask?.description} was created by user id: {user?.id}
      </Text>
    </View>
  );
};
// :replace-end:
// :snippet-end:

export default SyncedSampleTask;
