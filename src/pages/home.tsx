import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import DeleteUser from "./delete-user";
import EditUser from "./edit-user";
import { Skeleton } from "../components/ui/skeleton";
import { strictInstance } from "@/api/instance";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGet, setIsGet] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [isGet]);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await strictInstance.get("/users");
      setUsers(response.data.data);
    } catch (error: any) {
      return <div>Error: {error.message}</div>;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await strictInstance.delete("/logout");
      localStorage.removeItem("accessToken");
    } catch (error: any) {
      console.error(error?.response?.data || error.message);
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl p-5">
        <div className="mb-2">
          <Button onClick={logoutHandler} className="cursor-pointer">
            <LogOutIcon /> Logout
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] text-center">No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <Skeleton className="w-[40px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[20px] rounded-full" />
                </TableCell>
              </TableRow>
            ) : (
              <User setIsGet={setIsGet} users={users} />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const User = ({ setIsGet, users }: any) => {
  return users.map((user: any, i: number) => (
    <TableRow key={user.id}>
      <TableCell className="text-center">{++i}</TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.gender}</TableCell>
      <TableCell>
        <div className="flex gap-1.5">
          <EditUser setIsGet={setIsGet} user={user} />
          <DeleteUser setIsGet={setIsGet} user={user} />
        </div>
      </TableCell>
    </TableRow>
  ));
};

export default HomePage;
