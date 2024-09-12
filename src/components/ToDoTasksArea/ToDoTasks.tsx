import { Space } from "antd";
import TaskCard from "../TaskCard";
import "./ToDoTasksStyle.css";
import React from "react";

interface ToDoTasksProps {
  taskCollectionTitle: string;
  tasks: Task[];
  updateTaskStatus: (
    id: number,
    newStatus: string,
    title: string,
    description: string
  ) => void;
  onFinishEdit: () => void;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const ToDoTasks = ({
  taskCollectionTitle,
  tasks,
  updateTaskStatus,
  onFinishEdit,
}: ToDoTasksProps) => {
  return (
    <Space direction="vertical" size={16} className="todoTaskWrap">
      <p className="todoTaskTitle">{taskCollectionTitle}</p>
      {tasks.map((task: Task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          updateTaskStatus={updateTaskStatus}
          onFinishEdit={onFinishEdit}
        />
      ))}
    </Space>
  );
};

export default ToDoTasks;
