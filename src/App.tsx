import "./App.css";
import React from "react";
import { Row, FormProps } from "antd";
import ToDoTasks, { Task } from "./components/ToDoTasksArea/ToDoTasks";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import AddNewTaskModal, { FieldType } from "./components/AddNewTaskModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoData, settodoData] = useState<Task[]>([]);
  const [inProgressData, setinProgressData] = useState([]);
  const [completedData, setcompletedData] = useState([]);

  useEffect(() => {
    // Fetch tasks initially
    fetchPendingTasks();
    fetchInProgressTasks();
    fetchCompletedTasks();
  }, []);

  //  Fetches all tasks with status "pending" from the server, and updates the state
  const fetchPendingTasks = () => {
    axios
      .get("http://localhost:8080/tasks/todoTasks")
      .then((response) => {
        settodoData(response.data);
        console.log("Fetched todoData:", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Fetches all tasks with status "inProgress" from the server, and updates the state
  const fetchInProgressTasks = () => {
    axios
      .get("http://localhost:8080/tasks/inProgressTasks")
      .then((response) => {
        setinProgressData(response.data);
        console.log("inProgressData", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Fetches all tasks with status "completed" from the server, and updates the state
  const fetchCompletedTasks = () => {
    axios
      .get("http://localhost:8080/tasks/completedTasks")
      .then((response) => {
        setcompletedData(response.data);
        console.log("completedData", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  Sets isModalOpen state to true, which causes the Add Task modal to appear.
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Sets isModalOpen to false, which causes the Add Task modal to close.
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handles the submission of the Add Task form.
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    axios
      .post(`http://localhost:8080/tasks/`, {
        title: values.todo,
        description: values.description,
        status: "pending",
      })
      .then((response) => {
        console.log("Task created:", response.data);
        fetchPendingTasks();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handles the failure of the Add Task form submission.
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  // Updates the status of a task in the database.
  const updateTaskStatus = (
    id: number,
    newStatus: string,
    title: string,
    description: string
  ) => {
    axios
      .put(`http://localhost:8080/tasks/${id}`, {
        title: title,
        description: description,
        status: newStatus,
      })
      .then((response) => {
        console.log(`Task ${id} updated to ${newStatus}`);
        fetchCompletedTasks();
        fetchInProgressTasks();
        fetchPendingTasks();
      })
      .catch((error) => {
        console.log(`Error updating task ${id}:`, error);
      });
  };
  //  Called when the edit task modal is finished. Refetches all tasks from the server and updates the component state.
  const onFinishEdit = () => {
    fetchCompletedTasks();
    fetchInProgressTasks();
    fetchPendingTasks();
  };

  return (
    <div className="App">
      <HeaderBar showModal={showModal} />
      <Row gutter={16} className="taskArea">
        <ToDoTasks
          taskCollectionTitle="Pending"
          tasks={todoData ? todoData : []}
          updateTaskStatus={updateTaskStatus}
          onFinishEdit={onFinishEdit}
        />
        <ToDoTasks
          taskCollectionTitle="In Progress"
          tasks={inProgressData ? inProgressData : []}
          updateTaskStatus={updateTaskStatus}
          onFinishEdit={onFinishEdit}
        />
        <ToDoTasks
          taskCollectionTitle="Completed"
          tasks={completedData ? completedData : []}
          updateTaskStatus={updateTaskStatus}
          onFinishEdit={onFinishEdit}
        />
      </Row>
      <AddNewTaskModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </div>
  );
}

export default App;
