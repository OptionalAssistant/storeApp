"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function AdminButton() {
  const router = useRouter();

  const navigateToPanel = async () => {
    router.push("/dashboard");
  };

  return (
    <Button className="ms-4" variant="danger" onClick={navigateToPanel}>
      Admin
    </Button>
  );
}
