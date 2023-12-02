import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTask, useEditTaskStatus, useGetTasks } from "../../lib/hooks";
import useUserStore from "../../lib/stores/user-store";
import { TaskType } from "../../lib/types";
import AddTask from "../task/add-task";
import Task from "../task/task";

const Home = () => {
  const { isLoggerIn } = useUserStore();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (!isLoggerIn) {
      navigate("/login");
    }
  }, []);

  const {
    data: tasks,
    isLoading,
  }: {
    isLoading: boolean;
    data: TaskType[] | undefined;
  } = useGetTasks();
  const { mutate: mutateAdd, isPending: isPendingAdd } = useAddTask();
  const { mutate: mutateEdit } = useEditTaskStatus();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    status: "todo" | "doing" | "done"
  ) => {
    e.preventDefault();

    const taskId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const selectedTask = tasks?.find((task) => task.id === taskId);
    if (selectedTask !== undefined && status !== selectedTask.status) {
      const newTask = { ...selectedTask, status } as TaskType;
      mutateEdit(newTask);
    }
  };

  return (
    <main className="">
      {isOpen && (
        <AddTask
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          mutate={mutateAdd}
        />
      )}
      <div className="py-4 flex justify-end">
        <Button color="primary" onClick={onOpen} isLoading={isPendingAdd}>
          Add A Task
        </Button>
      </div>
      {!isLoading ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 pt-6">
          <Card
            className="border-blue-500 border-1"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "todo")}
          >
            <CardHeader>
              <p className="font-bold text-large text-blue-500">To Do</p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-2">
                {tasks
                  ?.filter((task) => task.status === "todo")
                  .map((task) => (
                    <Task key={task.id} task={task} />
                  ))}
              </div>
            </CardBody>
          </Card>
          <Card
            className="border-yellow-500 border-1"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "doing")}
          >
            <CardHeader>
              <p className="font-bold text-large text-yellow-500">Doing</p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-2">
                {tasks
                  ?.filter((task) => task.status === "doing")
                  .map((task) => (
                    <Task key={task.id} task={task} />
                  ))}
              </div>
            </CardBody>
          </Card>
          <Card
            className="border-green-500 border-1"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "done")}
          >
            <CardHeader>
              <p className="font-bold text-large text-green-500">Done</p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-2">
                {tasks
                  ?.filter((task) => task.status === "done")
                  .map((task) => (
                    <Task key={task.id} task={task} />
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      )}
    </main>
  );
};

export default Home;
