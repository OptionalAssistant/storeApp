import DashboardClient from "../_components/DashboardClient";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardPage(props: any) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token"); 

    if (!token) {
      notFound();
    }

    const response = await fetch("http://localhost:4444/auth/admin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      cache: "no-store",
      credentials: 'include', 
    });

    if (!response.ok) {
      notFound();
    }

    return <DashboardClient />;
  } catch (error) {

    notFound();
  }
}
