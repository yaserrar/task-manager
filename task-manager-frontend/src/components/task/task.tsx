import React from "react";
import { TaskType } from "../../lib/types";
import { Button, useDisclosure } from "@nextui-org/react";
import { Pencil, Trash } from "lucide-react";
import EditTask from "./edit-task";
import { useDeleteTask, useEditTask } from "../../lib/hooks";
import DeleteTask from "./delete-task";

type Props = {
  task: TaskType;
};

const Task = ({ task }: Props) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const { mutate: mutateEdit, isPending: isPendingEdit } = useEditTask(task.id);
  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteTask(
    task.id
  );

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("text/plain", taskId.toString());
  };

  return (
    <>
      {isOpenEdit && (
        <EditTask
          isOpen={isOpenEdit}
          onOpenChange={onOpenChangeEdit}
          mutate={mutateEdit}
          task={task}
        />
      )}

      {isOpenDelete && (
        <DeleteTask
          isOpen={isOpenDelete}
          onOpenChange={onOpenChangeDelete}
          mutate={mutateDelete}
        />
      )}

      <div
        draggable
        onDragStart={(e) => handleDragStart(e, task.id)}
        className="p-2 shadow-md rounded-xl cursor-pointer border-1 flex justify-between"
        onClick={onOpenEdit}
      >
        <div>
          <p className="font-bold text-md">{task.title}</p>
          <p className="font-medium text-sm">{task.description}</p>
        </div>
        <div>
          <Button
            size="sm"
            variant="light"
            isIconOnly
            isDisabled={isPendingEdit}
            onPress={onOpenEdit}
          >
            <Pencil size={16} />
          </Button>
          <Button
            size="sm"
            variant="light"
            color="danger"
            isIconOnly
            isDisabled={isPendingDelete}
            onPress={onOpenDelete}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Task;
