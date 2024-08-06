'use client';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "@/utils/types";

export default function Home() {
  const [data, setData] = useState<User>({} as User);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("userId");
    if (!storedData) {
      router.push("/login");
    }
  }, []);

  return (
    <main>
      <aside className="hidden md:block w-4 h-1">
        <p>{data?.first_name}</p>
      </aside>
    </main>
  );
}
