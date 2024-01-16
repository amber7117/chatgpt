"use client";

import { Logo } from "@/components/assets/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function Signup() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    avatar: "",
    apiKey: "",
    password: "",
  });
  const { toast } = useToast();
  const { push } = useRouter();

  function handleSignup() {
    const { email, apiKey, avatar, username, password } = inputs;
    axios
      .post("/api/auth/signup", { email, apiKey, avatar, username, password })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        push("/chat");
      })
      .catch((err) => {
        if (err instanceof AxiosError)
          toast({
            title: "注册失败",
            description: err.response?.data.message,
          });
      });
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <span className="mt-12">{Logo}</span>
      <Card className="w-[380px] py-5 mt-20 max-[900px]:mt-10 max-[400px]:w-[95%]">
        <CardHeader>
          <CardTitle>ChatGPT 新手</CardTitle>
          <CardDescription>Create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4 mt-1">
              <div className="flex flex-col gap-3  space-y-1.5">
                <Label htmlFor="email">邮箱 </Label>
                <Input
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, email: e.target.value }))
                  }
                  id="email"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="flex flex-col gap-3  space-y-1.5">
                <Label htmlFor="username">用户名</Label>
                <Input
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, username: e.target.value }))
                  }
                  id="username"
                  placeholder="johndoe"
                />
              </div>
              <div className="flex flex-col gap-3  space-y-1.5">
                <Label htmlFor="avatar">
                  Avatar URL
                  <span className="text-neutral-400">(自选)</span>
                </Label>
                <Input
                  value={inputs.avatar}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, avatar: e.target.value }))
                  }
                  id="avatar"
                  placeholder="https://github.com/johndoe.png"
                />
              </div>
              <div className="flex flex-col gap-3  space-y-1.5">
                <Label htmlFor="api">API key
                  <span className="text-neutral-400">(请到 https://ssu8.taobao.com/ 购买 )</span>
                </Label>
                <Input
                  value={inputs.apiKey}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, apiKey: e.target.value }))
                  }
                  id="api"
                  placeholder="xy125y7Trf786Something"
                />
              </div>
              <div className="flex flex-col gap-3 mt-2 space-y-1.5">
                <Label htmlFor="password">密码</Label>
                <Input
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, password: e.target.value }))
                  }
                  type="password"
                  id="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex mt-1">
          <Button
            disabled={
              !inputs.apiKey ||
              !inputs.email ||
              !inputs.password ||
              !inputs.username
            }
            onClick={handleSignup}
            variant="custom"
            className="w-full"
          >
            立即注册
          </Button>
        </CardFooter>
      </Card>
      <span className="mt-6 text-sm max-[400px]:pb-4">
        已有账户?{" "}
        <Link className="text-neutral-400" href="/auth/login">
          登录
        </Link>{" "}
      </span>
    </div>
  );
}
