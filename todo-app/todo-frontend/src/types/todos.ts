type TodoStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type Todos = {
  _id: string;
  task: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
};
