"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

export default function HomeButton(){
    const router = useRouter();
    
    const navigateHome = async () => {
        router.push("/");
      };

    return <Button onClick={navigateHome} className="me-4">Home</Button>
}