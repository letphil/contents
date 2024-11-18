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
    <div
      style={{
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        justifyContent: "space-between",
        alignItems: "stretch",
        display: "flex",
      }}
    >
      <div>
        <input
          className="add-todo-input"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
        />
        <button className="button" onClick={addTodo}>
          add
        </button>
      </div>
      <button
        onClick={() => {
          console.log("show deleted");
        }}
      >
        view deleted
      </button>
    </div>
  );
}
