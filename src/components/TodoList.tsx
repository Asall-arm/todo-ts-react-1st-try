import React from "react";
import type { Todo } from "../models";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <p className="text-gray-600 text-center mt-6">
        هیچ کاری برای انجام وجود ندارد.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;