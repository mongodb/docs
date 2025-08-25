const TaskList = () => {
  // retrieve the set of Task objects
  const tasks = useQuery(Task);
  // Sort tasks by name in ascending order
  const tasksByName = useQuery(Task, tasks => {
    return tasks.sorted('name');
  });
  // Sort tasks by name in descending order
  const tasksByNameDescending = useQuery(Task, tasks => {
    return tasks.sorted('name', true);
  });
  // Sort tasks by priority in descending order and then by name alphabetically
  const tasksByPriorityDescendingAndName = useQuery(Task, tasks => {
    return tasks.sorted([
      ['priority', true],
      ['name', false],
    ]);
  });
  // Sort Tasks by Assignee's name.
  const tasksByAssigneeName = useQuery(Task, tasks => {
    return tasks.sorted('assignee.name');
  });

  return (
    <>
      <Text>All tasks:</Text>
      {tasks.map(task => (
        <Text>{task.name}</Text>
      ))}

      <Text>Tasks sorted by name:</Text>
      {tasksByName.map(task => (
        <Text>{task.name}</Text>
      ))}

      <Text>Tasks sorted by name descending:</Text>
      {tasksByNameDescending.map(task => (
        <Text>{task.name}</Text>
      ))}

      <Text>
        Tasks sorted by priority descending, and name alphabetically:
      </Text>
      {tasksByPriorityDescendingAndName.map(task => (
        <Text>
          {task.name}
        </Text>
      ))}

      <Text>Tasks sorted by assignee name:</Text>
      {tasksByAssigneeName.map(task => (
        <Text>{task.name}</Text>
      ))}
    </>
  );
};
