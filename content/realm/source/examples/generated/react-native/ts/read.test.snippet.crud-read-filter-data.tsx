const TaskList = () => {
  const [priority, setPriority] = useState(4);
  // filter for tasks with a high priority
  const highPriorityTasks = useQuery(
    Task,
    tasks => {
      return tasks.filtered('priority >= $0', priority);
    },
    [priority],
  );

  // filter for tasks that have just-started or short-running progress
  const lowProgressTasks = useQuery(Task, tasks => {
    return tasks.filtered(
      '$0 <= progressMinutes && progressMinutes < $1',
      1,
      10,
    );
  });

  return (
    <>
      <Text>Your high priority tasks:</Text>
      {highPriorityTasks.map(taskItem => {
        return <Text>{taskItem.name}</Text>;
      })}
      <Text>Your tasks without much progress:</Text>
      {lowProgressTasks.map(taskItem => {
        return <Text>{taskItem.name}</Text>;
      })}
    </>
  );
};
