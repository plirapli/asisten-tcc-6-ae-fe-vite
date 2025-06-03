import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Button } from "../components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Input } from "../components/ui/input";
import { strictInstance } from "@/api/instance";

const EditUser = ({ setIsGet, user }: any) => {
  const defaultValue = {
    name: user.name,
    email: user.email,
    gender: user.gender,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(defaultValue);

  const editUser = async (e: any) => {
    e.preventDefault();
    try {
      if (JSON.stringify(defaultValue) !== JSON.stringify(users)) {
        setIsLoading(true);
        await strictInstance.put(`/users/${user.id}`, users);
        setIsGet((prev: boolean) => !prev);
      }
      setIsOpen(false);
      setUsers({ ...defaultValue });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Pencil />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <form onSubmit={editUser}>
              <DrawerHeader>
                <DrawerTitle>Edit User</DrawerTitle>
                <DrawerDescription>
                  Ubah data user {user.name}
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-4 p-4 pt-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    onChange={(e) =>
                      setUsers({ ...users, name: e.target.value })
                    }
                    required
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
                    onChange={(e) =>
                      setUsers({ ...users, email: e.target.value })
                    }
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
              <DrawerFooter>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  Save Changes
                  {isLoading && <Loader2 className="animate-spin" />}
                </Button>
                <DrawerClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditUser;
