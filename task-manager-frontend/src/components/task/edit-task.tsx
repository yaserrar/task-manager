import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { UseMutateFunction } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { taskStatus } from "../../lib/data";
import { TaskSchema, taskSchema } from "../../lib/validations/task";
import { TaskType } from "../../lib/types";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  mutate: UseMutateFunction<TaskType, Error, TaskSchema, unknown>;
  task: TaskType;
};

const EditTask = ({ isOpen, onOpenChange, mutate, task }: Props) => {
  const defaultValues = {
    title: task.title,
    description: task.description,
    status: task.status,
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TaskSchema> = (data) => {
    mutate(data);
    reset();
    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-end gap-2 my-2 "
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit a Task
              </ModalHeader>
              <ModalBody>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Title"
                      type="text"
                      className="text-xs"
                      errorMessage={errors.title?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Description"
                      type="text"
                      className="text-xs"
                      errorMessage={errors.description?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                      label="Type"
                      errorMessage={errors.status?.message}
                      ref={ref}
                      onBlur={onBlur}
                      onChange={onChange}
                      selectedKeys={value ? [value] : []}
                    >
                      {taskStatus.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.title}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EditTask;
