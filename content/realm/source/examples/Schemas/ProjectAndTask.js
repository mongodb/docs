const TaskSchema = {
  name: "Task",
  properties: {
    name: "string",
    isComplete: "bool",
    priority: "int",
    progressMinutes: "int",
    assignee: "string?"
  }
};

const ProjectSchema = {
  name: "Project",
  properties: {
    name: "string",
    tasks: "Task[]"
  }
};
