export type TodoStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DELETED";

export type Todo = {
  _id: string;
  task: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};
