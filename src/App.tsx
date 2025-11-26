import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2'; 

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setTodos(parsed);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  // Toggle complete
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Search filter using includes()
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">

        <h1 className="text-3xl font-bold text-indigo-600 text-center">
          پروژه تودو لیست
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="جست‌وجو..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Add Todo */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="تسک جدید اضافه کن..."
            className="border p-2 rounded w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            اضافه کن
          </button>
        </div>

{/* Todo List */}
        <ul className="space-y-3">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm"
            >
              <span
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>

              <div className="flex items-center gap-3">

                {/* Check Button */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`text-xl font-bold ${
                    todo.completed
                      ? "text-green-600 hover:text-green-700"
                      : "text-gray-400 hover:text-green-600"
                  }`}
                >
                  <FaCheck />

                </button>

                {/* Delete Button */}
<button
  onClick={async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 text-white px-4 py-2 rounded mx-2",
        cancelButton: "bg-red-600 text-white px-4 py-2 rounded mx-2",
      },
      buttonsStyling: false,
    });

    const result: SweetAlertResult = await swalWithBootstrapButtons.fire({
      title: "مطمئنی؟",
      text: "دیگه برنمی‌گرده.. :(",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "اره :> !",
      cancelButtonText: "نه :(( !",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // actually delete the todo
      deleteTodo(todo.id);

      swalWithBootstrapButtons.fire({
        title: "حذف!",
        text: "پاک شد :((",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "کنسل",
        text: "نگران نباش، جاش امنه :)",
        icon: "error",
      });
    }
  }}
  className="text-red-500 text-xl hover:text-red-600"
>
  <IoMdClose />
</button>

              </div>
            </li>
          ))}

          {filteredTodos.length === 0 && (
            <p className="text-gray-400 text-center">هیچ تسکی پیدا نشد…</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;