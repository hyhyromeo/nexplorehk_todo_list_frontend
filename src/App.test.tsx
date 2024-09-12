import React from "react";
import { render, screen } from "@testing-library/react";
import TaskCard from "./components/TaskCard";
import "@testing-library/jest-dom";

describe("TaskCard Component", () => {
  test("renders the task card with title and description", () => {
    render(
      <TaskCard
        title="Test Task"
        description="This is a test task description."
        id={1}
        status="pending"
        updateTaskStatus={jest.fn()}
        onFinishEdit={jest.fn()}
      />
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test task description.")
    ).toBeInTheDocument();
  });
});
