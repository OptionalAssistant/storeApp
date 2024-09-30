"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch("http://localhost:4444/auth/logout", {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    });
    router.refresh();
  };
  return (
    <Button variant="danger" className="my-4" onClick={logout}>
      Logout
    </Button>
  );
}
