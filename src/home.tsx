import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import axios from "axios";
import { BASE_URL } from "./utils";
import AddUser from "./add-user";
import DeleteUser from "./delete-user";
import EditUser from "./edit-user";
import { Skeleton } from "./components/ui/skeleton";

const App = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGet, setIsGet] = useState(true);

  useEffect(() => {
    getUsers();
  }, [isGet]);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl p-5">
        <div className="flex items-center mb-2">
          <div className="w-full font-bold">Daftar User</div>
          <AddUser setIsGet={setIsGet} />
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

export default App;
