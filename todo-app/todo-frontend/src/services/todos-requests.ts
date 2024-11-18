// import { Todo } from "../types/todos";
import { TodoStatus } from "../types/todos";
import api from "./api";

export async function getTodos(todoStatus?: TodoStatus) {
  let endpointString = "/todos/get-tasks";

  if (todoStatus) {
    endpointString += `?status=${todoStatus}`;
  }

  const { data, status } = await api.get(endpointString);

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

export async function updateTask(todoItemId: string, task: string) {
  const { data, status } = await api.put(`/todos/update-task/${todoItemId}`, {
    task: task,
  });

  if (status !== 200) return null;

  return data;
}

export async function updateStatus(todoItemId: string, task: string) {
  const { data, status } = await api.put(`/todos/update-status/${todoItemId}`, {
    task: task,
  });

  if (status !== 200) return null;

  return data;
}

export async function recoverTask(todoItemId: string, task: string) {
  const { data, status } = await api.put(`/todos/update-task/${todoItemId}`, {
    task: task,
  });

  if (status !== 200) return null;

  return data;
}
