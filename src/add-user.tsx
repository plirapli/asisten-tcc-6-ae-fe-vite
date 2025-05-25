import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import axios from "axios";
import { BASE_URL } from "./utils";
import { Loader2, Plus } from "lucide-react";

const AddUser = ({ setIsGet }: any) => {
  const defaultValue = { name: "", email: "", gender: "Male" };
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(defaultValue);
  const addUser = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/users`, users);
      setOpen(false);
      setUsers({ ...defaultValue });
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
        <Button size={"sm"} className="cursor-pointer">
          Add User
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Tambah user baru</DialogDescription>
        </DialogHeader>
        <form onSubmit={addUser}>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={(e) => setUsers({ ...users, name: e.target.value })}
                value={users.name}
                id="name"
                placeholder="Hehehe"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setUsers({ ...users, email: e.target.value })}
                value={users.email}
                placeholder="hehe@gmail"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Gender" className="text-right">
                Gender
              </Label>
              <RadioGroup
                className="flex"
                defaultValue={users.gender}
                onValueChange={(e) => setUsers({ ...users, gender: e })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Male"
                    id="male"
                    checked={users.gender == "Male"}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Female"
                    id="female"
                    checked={users.gender == "Female"}
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isLoading}
            >
              Continue
              {isLoading && <Loader2 className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
