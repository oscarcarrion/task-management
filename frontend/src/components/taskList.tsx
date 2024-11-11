import { VStack, Text, HStack, Box } from "@chakra-ui/react";
import { Task } from "../types/task";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const handleTaskStatusChange = (taskId: string, checked: boolean) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: checked
            ? ("completed" as "completed")
            : ("pending" as "pending"),
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  if (!Array.isArray(tasks)) {
    console.error("tasks is not an array:", tasks);
    return <Text color="gray.500">Error loading tasks</Text>;
  }

  if (tasks.length === 0) {
    return <Text color="gray.500">No tasks yet</Text>;
  }

  return (
    <VStack align="stretch" width="100%" maxW="600px">
      {tasks.map((task) => (
        <Box
          key={task.id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="sm"
        >
          <HStack justify="space-between">
            <Text>{task.title || "Untitled Task"}</Text>
            <Checkbox
              checked={task.status === "completed"}
              onCheckedChange={(e) =>
                handleTaskStatusChange(task.id, Boolean(e.checked))
              }
            />
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default TaskList;
