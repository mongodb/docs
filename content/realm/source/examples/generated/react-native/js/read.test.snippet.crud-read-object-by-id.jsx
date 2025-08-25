const TaskItem = ({_id}) => {
  const myTask = useObject(Task, _id);

  return (
    <View>
      {myTask ? (
        <Text>
          {myTask.name} is a task with the priority of: {myTask.priority}
        </Text>
      ) : null}
    </View>
  );
};
