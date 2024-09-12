import { Button, Form, Input, Modal } from "antd";
import React from "react";

interface AddNewTaskModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onFinish: (values: FieldType) => void;
  onFinishFailed: (errorInfo: any) => void;
}
export interface FieldType {
  todo: string;
  description?: string;
}
const AddNewTaskModal = ({
  isModalOpen,
  handleCancel,
  onFinish,
  onFinishFailed,
}: AddNewTaskModalProps) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Task"
      open={isModalOpen}
      footer={null}
      onCancel={() => {
        handleCancel();
        form.resetFields();
      }}
    >
      <Form
        form={form}
        name="Add New Task"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={(e) => {
          onFinish(e);
          form.resetFields();
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        clearOnDestroy={true}
      >
        <Form.Item<FieldType>
          label="Task Title"
          name="todo"
          rules={[{ required: true, message: "Please input your Task Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
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

export default AddNewTaskModal;
