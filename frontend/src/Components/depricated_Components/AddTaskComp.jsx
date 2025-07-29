import React, { useState } from "react";
import TaskFormComp from "./TaskFormComp";

function AddTaskComp({ switchView }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (title && description) {
          setMsg("Saving...")

          const taskData = {
              title,
              description,
              dueDate,
              priority,
              status
          };

          fetch('http://localhost:8080/task/new', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(taskData),
          })
              .then(response => {
                  if (!response.ok) {
                      throw new Error(response.url + ' | ' + response.status + ' ' + response.statusText)
                  }
                  return response.text();
              })
              .then(() => {
                  console.log("New Task added: ", {title, description, dueDate, priority, status});
                  setTitle("");
                  setDescription("");
                  setDueDate("");
                  setPriority("");
                  setStatus("");
                  setError(null)
                  switchView("overview")
              })
              .catch((error) => {
                  console.error('Error:', error);
                  setError('Error:' + error.message);
              });
      } else {
          setError("Not all required fields are filled out")
          setTimeout(() => setError(null), 300)
      }
  };

  return (
      <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
          <TaskFormComp
              handleSubmit={handleSubmit}
              title={title}
              description={description}
              dueDate={dueDate}
              priority={priority}
              status={status}
              error={error}
              msg={msg}
              setTitle={setTitle}
              setDescription={setDescription}
              setDueDate={setDueDate}
              setPriority={setPriority}
              setStatus={setStatus}
          />
      </div>
  )
}

export default AddTaskComp;

