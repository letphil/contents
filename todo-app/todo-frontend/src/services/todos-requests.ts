import api from "./api";

export async function getTodos() {
  const { data, status } = await api.get("/todos/get-tasks");

  if (status !== 200) {
    return null;
  }

  return data;
}

export async function addTodo(task: string) {
  const { data, status } = await api.post("/todos/add-task", { task });

  if (status !== 200) return null;

  return data;
}

export async function deleteTodo(todoItemId: string) {
  const { data, status } = await api.delete(`/todos/delete-task/${todoItemId}`);

  if (status !== 200) return null;

  return data;
}
