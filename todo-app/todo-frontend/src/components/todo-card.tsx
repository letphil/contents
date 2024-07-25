import { TodoStatus } from "../types/todos";
import "../index.css";

interface ITodoCard {
  task: string;
  status: TodoStatus;
  createdAt?: string;
  updatedAt?: string;
  deleteTodo: () => void;
}

export default function TodoCard({
  task,
  status,
  createdAt,
  updatedAt,
  deleteTodo,
}: ITodoCard) {
  return (
    <div className="todo-card">
      <p>{task}</p>
      <p>{status}</p>
      {createdAt && <p>{createdAt}</p>}
      {updatedAt && <p>{updatedAt}</p>}
      <div>
        <button className="button" onClick={deleteTodo}>
          X
        </button>
      </div>
    </div>
  );
}
