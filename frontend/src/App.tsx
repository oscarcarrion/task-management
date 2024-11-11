import { useState, useEffect } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { Task } from "./types/task";
import { taskService } from "./services/taskService";
import TaskList from "./components/taskList";
import TaskForm from "./components/taskForm";
import CustomSkeleton from "./components/customSkeleton";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
      setIsLoading(false);
    } catch (error) {
      console.error("failed to load tasks:", error);
    }
  };

  const handleAddTask = async (title: string) => {
    setIsLoading(true);
    try {
      const newTask = await taskService.createTask(title);
      setTasks([...tasks, newTask]);
      console.log("new task added:", newTask);
    } catch (error) {
      console.error("failed to add task:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box p={8}>
      <VStack gap={8}>
        <Heading>Task Management</Heading>
        <TaskForm onAddTask={handleAddTask} />
        {isLoading ? (
          <CustomSkeleton />
        ) : (
          <TaskList tasks={tasks} setTasks={setTasks} />
        )}
      </VStack>
    </Box>
  );
}

export default App;
