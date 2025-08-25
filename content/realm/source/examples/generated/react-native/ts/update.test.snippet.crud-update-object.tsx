const TaskItem = ({_id}: {_id: number}) => {
  const realm = useRealm();
  const myTask = useObject(Task, _id);

  const incrementTaskProgress = () => {
    if (myTask) {
      realm.write(() => {
        myTask.progressMinutes! += 1;
      });
    }
  };

  if (myTask) {
    return (
      <>
        <Text>Task: {myTask.name}</Text>
        <Text>Progress made (in minutes):</Text>
        <Text>{myTask.progressMinutes}</Text>
        <Button
          onPress={() => incrementTaskProgress()}
          title='Increment Task Progress'
        />
      </>
    );
  } else {
    return <></>;
  }
};
