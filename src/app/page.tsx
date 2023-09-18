import ShopCard from "@/components/ShopCard";
import { Divider, Typography } from "@mui/material";
import MainNav from "@/components/MainNav";
import { prisma } from "@/lib";

export default async function Home() {
  const count = await prisma.locations.count();
  return (
    <div>
      <MainNav />
      <Typography variant="h3" sx={{ textAlign: "center", mt: 16, mb: 3 }}>
        Shop Lists
      </Typography>
      <ShopCard count={count} />
      <Divider sx={{ my: 6 }} />
      <h1 style={{ textAlign: "center" }}>Products List</h1>
    </div>
  );
}
