"use client";

import { useRouter } from "next/navigation";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import Row from "react-bootstrap/esm/Row";
import { useForm } from "react-hook-form";
import { User } from "../types/types";
import { useState } from "react";


interface ModalProps {
  show: boolean;
  hide: () => void;
}

function ModalLogin(props: ModalProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({ mode: "onChange" });


  const router = useRouter();
  const [isPending, setPending] = useState(false);

  const onSubmit = async (value: User) => {
    setPending(true);
    const response = await fetch("http://localhost:4444/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value), // Convert the data to a JSON string
      credentials: 'include', 
    });

    setPending(false);

    if (!response.ok) {
      // If response is not okay, throw an error
        
      setError("password", { type: "manual", message: "Login faled" });
      return;
    }
    router.refresh();

    props.hide();
  };

  const handleclick = () => {
    props.hide();
    router.push("register");
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-dark"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              // type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            <span>{errors.email?.message}</span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          </Form.Group>

          <Row className="justify-content-between mb-3">
            <Col className="col-sm-auto">
              <Button
                variant="dark button-outline btn btn-primary btn-md"
                type="submit"
                disabled={isPending}
              >
                Login
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className="d-flex justify-content-between">
          <Col className="col-md-auto">
            <Button
              className="btn btn-info"
              variant="dark button-outline btn btn-primary btn-md"
              role="button"
              type="button"
              onClick={handleclick}
            >
              Regitser
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.hide}
          variant="dark button-outline btn btn-primary btn-md"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLogin;
