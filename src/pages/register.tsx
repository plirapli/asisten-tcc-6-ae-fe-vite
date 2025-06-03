import { defaultInstance } from "@/api/instance";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function RegisterPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();
    setMsg("");

    try {
      setIsLoading(true);
      const { password, confirmPassword } = user;
      if (password === confirmPassword) {
        const response = await defaultInstance.post("/register", user);
        setMsg(response.data.message);
        navigate("/login");
      } else {
        setMsg("Password unmatched");
      }
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              {msg && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircleIcon />
                  <AlertTitle>{msg}</AlertTitle>
                </Alert>
              )}
              <CardTitle>Create a new account</CardTitle>
              <CardDescription>
                Enter your data below to register a new account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => loginHandler(e)}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="tes"
                      value={user.name}
                      required
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="tes@tes.com"
                      value={user.email}
                      required
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="Gender">Gender</Label>
                    <RadioGroup
                      className="flex"
                      defaultValue={user.gender}
                      onValueChange={(e) => setUser({ ...user, gender: e })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Male"
                          id="male"
                          checked={user.gender == "Male"}
                        />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Female"
                          id="female"
                          checked={user.gender == "Female"}
                        />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      value={user.password}
                      required
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      value={user.confirmPassword}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3 mt-1">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      Register
                      {isLoading && <Loader2 className="animate-spin" />}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Sign In
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
