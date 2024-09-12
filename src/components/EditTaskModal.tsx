import { Button, Form, FormProps, Input, Modal } from "antd";
import axios from "axios";
import { Task } from "./ToDoTasksArea/ToDoTasks";
import React from "react";

interface EditTaskModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  taskData: Task;
  onFinishEdit: () => void;
}
interface FieldType {
  todo: string;
  description?: string;
}
const EditTaskModal = ({
  isModalOpen,
  handleCancel,
  onFinishEdit,
  taskData,
}: EditTaskModalProps) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    axios
      .put(`http://localhost:3000/tasks/${taskData.id}`, {
        title: values.todo,
        description: values.description,
        status: taskData.status,
      })
      .then((response) => {
        console.log("Task created:", response.data);
        onFinishEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Add New Task"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        name={`Edit ${taskData.id}`}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Task Title"
          name="todo"
          initialValue={taskData.title}
          rules={[{ required: true, message: "Please input your Task Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          initialValue={taskData.description}
          rules={[
            { required: true, message: "Please input your Description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
