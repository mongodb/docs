import {View, Text} from 'react-native';
import TaskContext, {Task} from '../models/Task';
const {useObject} = TaskContext;

// :snippet-start: example-useobject-hook-usage
const SampleTask = ({_id}) => {
  const myTask = useObject(Task, _id);
  return (
    <View>
      <Text>Task: {myTask?.description} </Text>
    </View>
  );
};
// :snippet-end:

export default SampleTask;
