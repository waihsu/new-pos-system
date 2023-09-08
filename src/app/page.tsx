import Image from "next/image";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import ShopCard from "@/components/ShopCard";
import { getLocations } from "@/lib/server";
import { Divider } from "@mui/material";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const locations = await getLocations();
  return (
    <div style={{ paddingTop: 80 }}>
      <h1>Shop List</h1>
      <ShopCard locations={locations} />
      <Divider />
      <h1>Products List</h1>
    </div>
  );
}
