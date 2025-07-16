import React, {useEffect, useState} from 'react';



function Overview() {

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const response = await fetch('http://localhost:8080/task/all');

        setTasks(await response.json());
    }

    useEffect(() => {
        getTasks()
    }, [])

  return (
      <div>

          <ol className="list-group-horizontal">

              {tasks.map((data) => {
                  return (
                      <li className="list-group-item" key={data.id}>{data.title + ' ' + data.description + ' ' + data.status} </li>
                  )
              })}

          </ol>
      </div>
  );
}

export default Overview;