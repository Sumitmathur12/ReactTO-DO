import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrEditTodo = () => {
    if (task.trim() === "") return;

    if (editingIndex !== null) {
      const updated = [...todos];
      updated[editingIndex].text = task;
      setTodos(updated);
      setEditingIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }

    setTask("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setTask("");
      setEditingIndex(null);
    }
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const startEdit = (index) => {
    setTask(todos[index].text);
    setEditingIndex(index);
  };

  // ✅ Load from updated localStorage key
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos-v2"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // ✅ Save to updated localStorage key
  useEffect(() => {
    localStorage.setItem("todos-v2", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <div className="todo-container">
        <h1>✅ Advanced Todo App</h1>

        <div className="input-section">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button onClick={addOrEditTodo}>
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo, idx) => (
            <li key={idx} className={todo.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(idx)}>{todo.text}</span>
              <div className="actions">
                <button onClick={() => startEdit(idx)}>✏️</button>
                <button onClick={() => deleteTodo(idx)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p className="empty">No tasks yet ✨</p>}
      </div>
    </div>
  );
}

export default App;
