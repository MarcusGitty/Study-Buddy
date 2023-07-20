import { Delete as DeleteIcon } from "@mui/icons-material";
import { Checkbox, Card, Typography, Stack, IconButton, Button, TextField,Container } from "@mui/material";
import { supabase } from "../supabase";
import NavBar from "./NavBar";
import { useCallback, useEffect, useState } from "react";
import { useId } from "react";



export default function AssignmentTracker() {
  const [priority, setPriority] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const [error, setError] = useState(null);

 

  const fetchAssignments = useCallback(() => {
    supabase
      .from("AssignmentTracker")
      .select('*')
      .order("id")
      .then(({ data: assignments, error }) => {
        setAssignments(assignments);
        setError(error);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setAssignments, setError]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <>
      <Container maxWidth="sm">
        {assignments && (
          <AssignmentManager
            assignments={assignments}
            setAssignments={setAssignments}
            onAssignmentsChange={fetchAssignments}
          />
        )}
        {error && "Error! Failed to load assignments"}
        {!assignments && !error && "Loading..."}
      </Container>
    </>
  );
}


function AssignmentManager({ assignments, setAssignments, onAssignmentsChange }) {
  const [priority, setPriority] = useState(null);
  const [newAssignment, setNewAssignment] = useState("");
  const [error, setError] = useState(null);

  const handleNewAssignmentChange = (event) => {
    setNewAssignment(event.target.value);
  };

  const handleNewAssignmentSubmit = (event) => {
    event.preventDefault();
    supabase
      .from("AssignmentTracker")
      .insert({ assignment: newAssignment, 
                 })
      .then(({ error }) => {
        if (error) {
          setError(error);
        } else {
          onAssignmentsChange();
          setNewAssignment("");
        }
      });
    setError(null);
  };

  const handleAssignmentChange = (id) => {
    const assignment = assignments.find((assignment) => assignment.id === id);
    supabase
      .from("AssignmentTracker")
      .update({ completed: !assignment.completed })
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          console.log(error);
          alert("Failed to update assignment!");
        } else {
          onAssignmentsChange();
        }
      });
  };

  const handleAssignmentDelete = (id) => {
    supabase
      .from("AssignmentTracker")
      .delete()
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          alert("Failed to delete assignment!");
        } else {
          onAssignmentsChange();
        }
      });
  };

  return (
    <Stack component="main" gap={2} marginTop={2}>
      <Typography variant="h4" component="h2">
        Add new assignment
      </Typography>
      <Stack component="form" direction="row" gap={1}>
        <TextField
          size="small"
          sx={{ flexGrow: 1 }}
          placeholder="What would you like to do today?"
          value={newAssignment}
          onChange={handleNewAssignmentChange}
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          onClick={handleNewAssignmentSubmit}
        >
          Add
        </Button>
      </Stack>
      {error && <Typography color="red">Failed to create assignment!</Typography>}
      {assignments.length > 0 ? (
        <AssignmentType
          assignments={assignments}
          onAssignmentChange={handleAssignmentChange}
          onAssignmentDelete={handleAssignmentDelete}
        />
      ) : (
        <p>Awwwww there are no assignments yet...</p>
      )}
    </Stack>
  );
}


function AssignmentType({ assignments, onAssignmentChange, onAssignmentDelete }) {
  const handleAssignmentChange = (id) => () => {
    onAssignmentChange(id);
  };

  const handleAssignmentDelete = (id) => () => {
    onAssignmentDelete(id);
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        Assignment List
      </Typography>
      <Stack>
        {assignments.map((assignment) => {
          return (
            <Card key={assignment.id} sx={{ marginBottom: 1 }}>
              <Stack direction="row" alignItems="center">
                <Checkbox
                  checked={assignment.completed}
                  onChange={handleAssignmentChange(assignment.id)}
                />
                <Typography flexGrow={1}>{assignment.assignment}</Typography>
                <Typography flexGrow={1} fontSize={11}>{assignment.status}</Typography>
                <IconButton color="error" onClick={handleAssignmentDelete(assignment.id)}>
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