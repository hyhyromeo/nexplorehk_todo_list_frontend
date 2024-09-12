import React from "react";
import { Card, Dropdown, MenuProps, Modal, Space } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EditOutlined,
  LeftOutlined,
  MoreOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  status: string;
  updateTaskStatus: (
    id: number,
    newStatus: string,
    title: string,
    description: string
  ) => void;
  onFinishEdit: () => void;
}

const TaskCard = ({
  id,
  title,
  description,
  status,
  updateTaskStatus,
  onFinishEdit,
}: TaskCardProps) => {
  const [deleteConfirmModalOpen, setdeleteConfirmModalOpen] = useState(false);
  const [editTaskModalModalOpen, seteditTaskModalModalOpen] = useState(false);

  const items: MenuProps["items"] = [];
  if (status === "pending") {
    items.push(
      {
        label: "Edit",
        icon: <EditOutlined />,
        key: "0",
        onClick: () => {
          seteditTaskModalModalOpen(true);
        },
      },
      {
        label: "Move to In Progress",
        icon: <RightOutlined />,
        key: "1",
        onClick: () => {
          updateTaskStatus(id, "inprogress", title, description); // Update to 'inprogress'
        },
      },
      {
        label: "Move to Completed",
        icon: <DoubleRightOutlined />,
        key: "2",
        onClick: () => {
          updateTaskStatus(id, "completed", title, description); // Update to 'completed'
        },
      },
      {
        type: "divider",
      },
      {
        label: "Delete",
        key: "3",
        style: { color: "red" },

        onClick: () => {
          setdeleteConfirmModalOpen(true);
        },
      }
    );
  } else if (status === "inprogress") {
    items.push(
      {
        label: "Edit",
        icon: <EditOutlined />,
        key: "0",
        onClick: () => {
          seteditTaskModalModalOpen(true);
        },
      },
      {
        label: "Return to Pending",
        icon: <LeftOutlined />,
        key: "1",
        onClick: () => {
          updateTaskStatus(id, "pending", title, description); // Update to 'inprogress'
        },
      },
      {
        label: "Move to Completed",
        icon: <RightOutlined />,
        key: "2",
        onClick: () => {
          updateTaskStatus(id, "completed", title, description); // Update to 'completed'
        },
      },
      {
        type: "divider",
      },
      {
        label: "Delete",
        style: { color: "red" },
        key: "3",
        onClick: () => {
          setdeleteConfirmModalOpen(true);
        },
      }
    );
  } else if (status === "completed") {
    items.push(
      {
        label: "Edit",
        icon: <EditOutlined />,
        key: "0",
        onClick: () => {
          seteditTaskModalModalOpen(true);
        },
      },
      {
        label: "Return to Pending",
        icon: <DoubleLeftOutlined />,
        key: "1",
        onClick: () => {
          updateTaskStatus(id, "pending", title, description); // Update to 'inprogress'
        },
      },
      {
        label: "Return to In Progress",
        icon: <LeftOutlined />,

        key: "2",
        onClick: () => {
          updateTaskStatus(id, "inprogress", title, description); // Update to 'completed'
        },
      },
      {
        type: "divider",
      },
      {
        label: "Delete",
        key: "3",
        style: { color: "red" },

        onClick: () => {
          setdeleteConfirmModalOpen(true);
        },
      }
    );
  }

  const deleteTaskHandler = () => {
    updateTaskStatus(id, "delete", title, description);
    setdeleteConfirmModalOpen(false);
  };
  return (
    <Card
      size="small"
      title={
        <span
          style={{
            marginLeft: "10px",
            display: "flex",
            width: "100%",
            fontWeight: "bold",
            justifyContent: "start",
            lineClamp: 1,
          }}
        >
          {title}
        </span>
      }
      extra={
        <Dropdown menu={{ items }}>
          <Space>
            <MoreOutlined style={{ fontSize: "20px" }} />
          </Space>
        </Dropdown>
      }
      style={{ width: "100%" }}
    >
      <p>{description}</p>
      <Modal
        title="Delete Task"
        open={deleteConfirmModalOpen}
        onOk={deleteTaskHandler}
        onCancel={() => setdeleteConfirmModalOpen(false)}
        okText="Delete"
        okType="danger"
        okButtonProps={{ style: { background: "red", color: "white" } }}
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
      <EditTaskModal
        onFinishEdit={() => {
          onFinishEdit();
          seteditTaskModalModalOpen(false);
        }}
        taskData={{ id, title, description, status }}
        isModalOpen={editTaskModalModalOpen}
        handleCancel={() => seteditTaskModalModalOpen(false)}
      />
    </Card>
  );
};

export default TaskCard;
