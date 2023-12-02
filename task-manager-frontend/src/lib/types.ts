export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  createdAt: string;
};
