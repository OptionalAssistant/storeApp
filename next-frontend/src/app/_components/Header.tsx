import { cookies } from "next/headers";
import AdminButton from "./header/AdminButton";
import HomeButton from "./header/HomeButton";
import LoginButton from "./header/LoginButton";
import LogoutButton from "./header/LogoutButton";

export default async function Header() {
  let button  = <LogoutButton/>;
  let isAdmin = false;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      button = <LoginButton />;
    } else {
      const response = await fetch("http://localhost:4444/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        cache: "no-store",
        credentials: "include",
      });
      if (!response.ok) {
        button = <LoginButton />;
      }

 
        const responseAdmin = await fetch("http://localhost:4444/auth/admin", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          cache: "no-store",
          credentials: "include",
        });
        if (responseAdmin.ok) {
        console.log("Admin")
         isAdmin = true;
        }
    }

  } catch (error) {}
  return (
    <>
      <HomeButton />
      {button}
      {isAdmin && <AdminButton />}
    </>
  );
}
