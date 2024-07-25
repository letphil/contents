import { useEffect, useState } from "react";

import { getTodos, addTodo, deleteTodo } from "./services/todos-requests";
import { Todos } from "./types/todos";
import TodoCard from "./components/todo-card";
import AddTodoInput from "./components/add-todo-input";

export default function App() {
  // state
  const [todoItems, setTodoItems] = useState<Todos[] | null>(null);
  const [todoItem, setTodoItem] = useState<string>("");

  const todoItemsGetRequest = async () => {
    const todos = await getTodos();
    setTodoItems(todos);
  };

  useEffect(() => {
    todoItemsGetRequest();
  }, []);

  if (!todoItems) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <AddTodoInput
        todoItem={todoItem}
        setTodoItem={setTodoItem}
        addTodo={async () => {
          const add = await addTodo(todoItem);
          setTodoItem("");
          if (add) {
            await todoItemsGetRequest();
          }
        }}
      />
      {todoItems.map((todoItem, idx) => {
        return (
          <TodoCard
            key={`${todoItem.task}-${idx.toString()}`}
            task={todoItem.task}
            status={todoItem.status}
            deleteTodo={async () => {
              console.log("remove this guy", todoItem._id);
              const deleteItem = await deleteTodo(todoItem._id);

              if (deleteItem) {
                todoItemsGetRequest();
              }
            }}
          />
        );
      })}
    </div>
  );
}
