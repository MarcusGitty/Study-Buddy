import { Checkbox, Card, Typography, Stack, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function TaskListType({ tasks, onTaskChange, onTaskDelete }) {
  const handleTaskChange = (id) => () => {
    onTaskChange(id);
  };

  const handleTaskDelete = (id) => () => {
    onTaskDelete(id);
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        Todo List
      </Typography>
      <Stack>
        {tasks.map((task) => {
          return (
            <Card key={task.id} sx={{ marginBottom: 1 }}>
              <Stack direction="row" alignItems="center">
                <Checkbox
                  checked={task.completed}
                  onChange={handleTaskChange(task.id)}
                />
                <Typography flexGrow={1}>{task.task}</Typography>
                <Typography flexGrow={1} fontSize={11}>{task.status}</Typography>
                <IconButton color="error" onClick={handleTaskDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </>
  );
}
