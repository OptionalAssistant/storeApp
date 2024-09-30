"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { useForm } from "react-hook-form";
import { User } from "../types/types";

function Register(props: any) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({ mode: "onChange" });

  const [isPending, setPending] = useState(false);

  const router = useRouter();

  const onSubmit = async (value: User) => {
    setPending(true);
    const response = await fetch("http://localhost:4444/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value), 
      credentials: 'include', 
    });

    setPending(false);
    if (!response.ok) {
        const errorData = await response.json();

      setError("password", {
        type: "manual",
        message: errorData.message || "Registration failed",
      });
      return;
    }

    router.push("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email..."
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        <span>{errors.email?.message}</span>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password..."
          {...register("password", {
            required: "Password is required",
          })}
        />
        <span style={{ color: "red" }}>{errors.password?.message}</span>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isPending}>
        Submit
      </Button>
    </Form>
  );
}

export default Register;
