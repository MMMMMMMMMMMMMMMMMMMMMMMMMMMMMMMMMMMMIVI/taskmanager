import React, { useState } from "react";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (title && description) {
          console.log("New Task added: ", {title, description, dueDate, priority, status});

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
              .then(data => {
                  console.log('YIPPIE', data);
                  setTitle("");
                  setDescription("");
                  setDueDate("");
                  setPriority(0);
                  setStatus("");
                  setError(null)
              })
              .catch((error) => {
                  console.error('Error:', error);
                  setError('Error:' + error.message);
              });
      }
  };

  return (
      <form onSubmit={handleSubmit}>
          <div>
              <label>
                  Title:
                  <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required={true}
                  />
              </label>
          </div>

          <div>
          <label>
              Description:
              <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required={true}
              />
          </label>
          </div>

          <div>
              <label>
                  Due Date:
                  <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                  />
              </label>
          </div>

          <div>
              <label>
                  Priority:
                  <input
                      type="number"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      min={0}
                      max={10}
                  />
              </label>
          </div>

          <div>
              <label>
                  Status:
                  <input
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                  />
              </label>
          </div>

          {error && <p style={{color: 'red'}}>{error}</p>}

          <button type="submit">Save</button>

      </form>
  )
}

export default TaskForm;

