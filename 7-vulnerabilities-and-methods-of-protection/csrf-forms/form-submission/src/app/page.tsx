"use client";

import { Button1, Checkbox1, Input1, Label1 } from "@/components/shared";
import { FormEvent } from "react";

export default function Home() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { target } = event;
    const targetWithProps = target as any;

    const data = {
      email: targetWithProps.email.value,
      password: targetWithProps.password.value,
      remember: targetWithProps.remember.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const result = await response.json();

    alert(`Is this your full data from the server ${result.data}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label1 htmlFor="email">Your email</Label1>

          <Input1
            type="email"
            id="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <Label1 htmlFor="password">Your password</Label1>
          <Input1 type="password" id="password" required />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <Checkbox1 id="remember" type="checkbox" />
          </div>

          <div className="ml-2">
            <Label1 htmlFor="remember"> Remember me</Label1>
          </div>
        </div>

        <Button1 type="submit">Submit</Button1>
      </form>
    </main>
  );
}
