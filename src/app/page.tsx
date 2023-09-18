import ShopCard from "@/components/ShopCard";
import { Divider, Typography } from "@mui/material";
import MainNav from "@/components/MainNav";

export default async function Home() {
  return (
    <div>
      <MainNav />
      <Typography variant="h3" sx={{ textAlign: "center", mt: 16, mb: 3 }}>
        Shop Lists
      </Typography>
      <ShopCard />
      <Divider sx={{ my: 6 }} />
      <h1 style={{ textAlign: "center" }}>Products List</h1>
    </div>
  );
}
