import TodoListType from "./TodoListType";
// import EmptyState from "./EmptyState";
import { Button, Stack, TextField, Typography,Container } from "@mui/material";
import { supabase } from "../supabase";
import NavBar from "./NavBar";
import { useCallback, useEffect, useState } from "react";


export default function TasksScreen() {
  const [priority, setPriority] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(() => {
    supabase
      .from("ToDoList")
      .select('*')
      .order("id")
      .then(({ data: tasks, error }) => {
        setTasks(tasks);
        setError(error);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setTasks, setError]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <Container maxWidth="sm">
        {tasks && (
          <TaskManager
            tasks={tasks}
            setTasks={setTasks}
            onTasksChange={fetchTasks}
          />
        )}
        {error && "Error! Failed to load tasks"}
        {!tasks && !error && "Loading..."}
      </Container>
    </>
  );
}


function TaskManager({ tasks, setTasks, onTasksChange }) {
  const [priority, setPriority] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);
  

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    supabase
      .from("ToDoList")
      .insert({ task: newTask, 
                completed: false,
                status: priority
                 })
      .then(({ error }) => {
        if (error) {
          setError(error);
        } else {
          onTasksChange();
          setNewTask("");
        }
      });
    setError(null);
  };

  const handleTaskChange = (id) => {
    const task = tasks.find((task) => task.id === id);
    supabase
      .from("ToDoList")
      .update({ completed: !task.completed })
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          console.log(error);
          alert("Failed to update task!");
        } else {
          onTasksChange();
        }
      });
  };

  const handleTaskDelete = (id) => {
    supabase
      .from("ToDoList")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          alert("Failed to delete task!");
        } else {
          onTasksChange();
        }
      });
  };

  return (
    <Stack component="main" gap={2} marginTop={2}>
      <Typography variant="h4" component="h2">
        Add new task
      </Typography>
      <Stack component="form" direction="row" gap={1}>
        <TextField
          size="small"
          sx={{ flexGrow: 1 }}
          placeholder="What would you like to do today?"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          onClick={handleNewTaskSubmit}
        >
          Add
        </Button>
      </Stack>
      {error && <Typography color="red">Failed to create task!</Typography>}
      {tasks.length > 0 ? (
        <TodoListType
          tasks={tasks}
          onTaskChange={handleTaskChange}
          onTaskDelete={handleTaskDelete}
        />
      ) : (
        <p>Awwwww there are no tasks yet...</p>
      )}
    </Stack>
  );
}