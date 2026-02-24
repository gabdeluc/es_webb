"use client";

import { useState } from "react";

// Definiamo come è fatto un singolo Task
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Aggiungi un nuovo task
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  // Inverti lo stato completato/non completato
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Elimina un task
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Logica per filtrare i task da mostrare
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-4 border-yellow-400 inline-block">My Tasks 📝</h1>
        
        {/* Input per nuovi task */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 border-2 border-gray-100 p-2 rounded-lg outline-none focus:border-yellow-400 text-gray-700"
            placeholder="Cosa devi fare?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button onClick={addTodo} className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-4 py-2 rounded-lg transition-all">
            +
          </button>
        </div>

        {/* Bottoni Filtro */}
        <div className="flex justify-center gap-2 mb-6 text-sm">
          {(["all", "active", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full capitalize ${
                filter === f ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f === "all" ? "Tutti" : f === "active" ? "Attivi" : "Finiti"}
            </button>
          ))}
        </div>

        {/* Lista dei Todo */}
        <ul className="space-y-3">
          {filteredTodos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between group bg-gray-50 p-3 rounded-xl border border-transparent hover:border-yellow-200 transition-all">
              <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${todo.completed ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                  {todo.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                  {todo.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Elimina
              </button>
            </li>
          ))}
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-400 py-4 italic">Nessun task trovato...</p>
          )}
        </ul>
      </div>
    </div>
  );
}