import Image from "next/image";
import styles from "./page.module.css";
import { getAllData } from "@/lib/server";

export default async function Home() {
  const products = await getAllData();
  console.log("prodcuts: ", products);
  return <div>Hello World!</div>;
}
