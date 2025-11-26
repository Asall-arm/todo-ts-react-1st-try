import React from "react";
import type { Todo } from "../models";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 rounded border-l-4 border-indigo-500">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onToggle(todo.id)}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          className="w-5 h-5"
          readOnly
        />
        <p
          className={`text-lg ${
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.title}
        </p>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        حذف
      </button>
    </div>
  );
};

export default TodoItem;