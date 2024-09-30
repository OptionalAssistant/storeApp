"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalLogin from "../LoginModal";

export default function LoginButton() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <>
      <Button className="my-4" onClick={() => setModalShow(true)}>
        Login
      </Button>

      <ModalLogin show={modalShow} hide={() => setModalShow(false)} />
    </>
  );
}
