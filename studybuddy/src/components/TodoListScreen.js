import TodoListType from "./TodoListType";
// import EmptyState from "./EmptyState";
import { Button, Stack, TextField, Typography,Container, MenuItem } from "@mui/material";
import { supabase } from "../supabase";
import NavBar from "./NavBar";
import { useCallback, useEffect, useState } from "react";
import { useId } from "react";


const priority = [
  {
    value: 'High Priority',
    label: 'High Priority',
  },
  {
    value: 'Low Priority',
    label: 'Low Priority',
  },

]

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
  const [newpriority, setPriority] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);

  const handleNewPriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    supabase
      .from("ToDoList")
      .insert({ task: newTask, 
                completed: false,
                status: newpriority,
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
          sx={{ flexGrow: 1 }}
          placeholder="What would you like to do today?"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <TextField
          id="outlined-select-modules"
          select
          label="Priority"
          defaultValue="High Priority"
          helperText="Priority"
          value = {newpriority}
          onChange = {handleNewPriorityChange}
  
        >
        {priority.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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