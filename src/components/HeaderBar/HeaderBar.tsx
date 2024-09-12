import React from "react";
import { Button } from "antd";
import "./HeaderBarStyle.css";
interface HeaderBarProps {
  showModal: () => void;
}

const HeaderBar = ({ showModal }: HeaderBarProps) => {
  return (
    <div className="header">
      <h1 className="title">Todo list</h1>
      <Button onClick={showModal} type="primary">
        Add Task
      </Button>
    </div>
  );
};

export default HeaderBar;
