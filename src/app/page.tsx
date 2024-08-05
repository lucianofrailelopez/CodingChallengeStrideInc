'use client';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "@/utils/types";

export default function Home() {
  const [data, setData] = useState<User>({} as User);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      setData(JSON.parse(user || "{}"));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <aside className="hidden md:block w-4 h-1">
        <p>{data?.first_name}</p>
        <Button onClick={logout}>
          Logout
        </Button>
      </aside>
    </main>
  );
}
