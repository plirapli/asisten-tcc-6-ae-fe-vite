import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import axios from "axios";
import { BASE_URL } from "./utils";
import { Loader2, Trash2 } from "lucide-react";

const DeleteUser = ({ setIsGet, user }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/users/${user.id}`);
      setOpen(false);
      setIsGet((prev: boolean) => !prev);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-red-500 hover:bg-red-50 transition-all cursor-pointer"
        >
          <Trash2 color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {user.name}?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={deleteUser}>
          <DialogFooter>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              Yes
              {isLoading && <Loader2 className="animate-spin" />}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                className="cursor-pointer"
                variant="outline"
              >
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
