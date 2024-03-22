import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css"

class TaskManagerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // Array para almacenar las tareas guardadas
      taskName: "",
      taskDate: "",
      taskDescription: "",
      filter: "all" // Estado para el filtro de tareas
    };
  }

  handleSaveTask = () => {
    const { taskName, taskDate, taskDescription } = this.state;
    const newTask = {
      name: taskName,
      date: taskDate,
      description: taskDescription,
      completed: false //Campo para rastrear si la tarea está completada o no
    };
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask], // Agregar la nueva tarea al array de tareas
      taskName: "",
      taskDate: "",
      taskDescription: ""
    }));
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  toggleTaskCompletion = (index) => {
    this.setState(prevState => {
      const updatedTasks = [...prevState.tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return { tasks: updatedTasks };
    });
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  }

  calculateCompletedPercentage = () => {
    const { tasks, filter } = this.state;
    let filteredTasks = tasks;

    if (filter === "completed") {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
      filteredTasks = tasks.filter(task => !task.completed);
    }

    const completedTasks = filteredTasks.filter(task => task.completed);
    return (completedTasks.length / filteredTasks.length) * 100;
  }

  render() {
    const { taskName, taskDate, taskDescription, tasks, filter } = this.state;
    const completedPercentage = this.calculateCompletedPercentage();

    let filteredTasks = tasks;

    if (filter === "completed") {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
      filteredTasks = tasks.filter(task => !task.completed);
    }

    return (
      <div className="container">
        <header>
          <h1>Task Manager App</h1>
        </header>
        Task Name 
        <br></br>
        <input type="text" id='taskName' value={taskName} onChange={this.handleInputChange}></input>
        <br></br>
        Task Date
        <br></br>
        <input type="date" id="taskDate" value={taskDate} onChange={this.handleInputChange}></input>
        <br></br>
        Task Description
        <br></br>
        <textarea placeholder='describe your task' id='taskDescription' value={taskDescription} onChange={this.handleInputChange}></textarea>
        <br></br>
        <button type="submit" onClick={this.handleSaveTask}>Save</button>
        <br></br>
        <div>
          <button onClick={() => this.changeFilter("all")}>All Tasks</button>
          <button onClick={() => this.changeFilter("completed")}>Completed Tasks</button>
          <button onClick={() => this.changeFilter("incomplete")}>Incomplete Tasks</button>
        </div>
        <h2>Saved Tasks:</h2>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <input type="checkbox" checked={task.completed} onChange={() => this.toggleTaskCompletion(index)} /> {/* Botón para marcar la tarea como completada */}
              <strong>Name:</strong> {task.name}, <strong>Date:</strong> {task.date}, <strong>Description:</strong> {task.description}
            </li>
          ))}
        </ul>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${completedPercentage}%` }}></div> {/* Barra de progreso con el ancho ajustado por el porcentaje de tareas completadas */}
        </div>
        <p>Completed: {completedPercentage}%</p> {/* Mostrar el porcentaje de tareas completadas */}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TaskManagerApp />);
