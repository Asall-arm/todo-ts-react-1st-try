import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";
import "./index.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (text.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title: text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Todo App — React + TypeScript
        </h1>

        {/* Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
            placeholder="یک کار جدید وارد کن..."
          />

          <button
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            افزودن
          </button>
        </div>

        {/* Todo List */}
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}

export default App;