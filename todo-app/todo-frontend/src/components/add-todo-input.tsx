interface IAddTodoIput {
  todoItem: string;
  setTodoItem: (arg: string) => void;
  addTodo: () => void;
}

export default function AddTodoInput({
  todoItem,
  setTodoItem,
  addTodo,
}: IAddTodoIput) {
  return (
    <span>
      <input
        className="add-todo-input"
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
      />
      <button className="button" onClick={addTodo}>
        add
      </button>
    </span>
  );
}
