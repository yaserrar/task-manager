import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { UseMutateFunction } from "@tanstack/react-query";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  mutate: UseMutateFunction<any, Error, void, unknown>;
};

const DeleteTask = ({ isOpen, onOpenChange, mutate }: Props) => {
  const deleteTask = () => {
    mutate();
    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete a Task
            </ModalHeader>
            <ModalBody>Are you sure you want to delete this task ?</ModalBody>
            <ModalFooter>
              <Button color="secondary" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" type="submit" onClick={deleteTask}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteTask;
