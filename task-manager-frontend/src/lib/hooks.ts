import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TaskSchema } from "./validations/task";
import axios from "axios";
import { TaskType } from "./types";
import useUserStore from "./stores/user-store";

export const useGetTasks = () => {
  const { jwt } = useUserStore();

  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () =>
      await axios
        .get("http://localhost:8080/api/tasks", {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => res.data),
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  const { jwt } = useUserStore();

  return useMutation({
    mutationFn: (data: TaskSchema) => {
      return axios
        .post("http://localhost:8080/api/tasks", data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => res.data);
    },
    onSuccess: async (task: TaskType) => {
      toast.success("Task added");
      queryClient.setQueryData(["tasks"], (tasks: TaskType[]) => {
        return [...tasks, task];
      });
    },
    onError: async () => {
      toast.error("Error");
    },
  });
};

export const useEditTaskStatus = () => {
  const queryClient = useQueryClient();
  const { jwt } = useUserStore();

  return useMutation({
    mutationFn: (task: TaskType) =>
      axios
        .put(`http://localhost:8080/api/tasks/${task.id}`, task, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => res.data),
    onSuccess: async () => {
      toast.success("Status modified");
    },
    onError: async (e) => {
      console.error(e);
      toast.error("Error");
    },
    onMutate: (newTask) => {
      queryClient.setQueryData(["tasks"], (tasks: TaskType[]) => {
        const updatedTaks = tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        });
        return updatedTaks;
      });
    },
  });
};

export const useEditTask = (id: number) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserStore();

  return useMutation({
    mutationFn: (data: TaskSchema) =>
      axios
        .put(`http://localhost:8080/api/tasks/${id}`, data, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => res.data),
    onSuccess: async (newTask: TaskType) => {
      queryClient.setQueryData(["tasks"], (tasks: TaskType[]) => {
        const updatedTaks = tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        });
        return updatedTaks;
      });

      toast.success("Status modified");
    },
    onError: async (e) => {
      console.error(e);
      toast.error("Error");
    },
  });
};

export const useDeleteTask = (id: number) => {
  const queryClient = useQueryClient();
  const { jwt } = useUserStore();

  return useMutation({
    mutationFn: () =>
      axios
        .delete(`http://localhost:8080/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        })
        .then((res) => res.data),
    onSuccess: async () => {
      queryClient.setQueryData(["tasks"], (tasks: TaskType[]) => {
        return tasks.filter((task) => task.id !== id);
      });
      toast.success("Task deleted");
    },
    onError: async (e) => {
      console.error(e);
      toast.error("Error");
    },
  });
};
