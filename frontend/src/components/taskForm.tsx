import React, { useState } from "react";
import { HStack, Input, Button } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toaster.create({
        title: "Error",
        description: "Task title cannot be empty",
        type: "error",
      });
      return;
    }

    try {
      await onAddTask(title);
      setTitle("");
      toaster.create({
        title: "Success",
        description: "Task added successfully",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to add task",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
      <HStack>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
          size="md"
        />
        <Button type="submit" colorScheme="blue">
          Add Task
        </Button>
        <Toaster />
      </HStack>
    </form>
  );
};

export default TaskForm;
