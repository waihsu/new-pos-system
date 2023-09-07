import BackOfficeSidebar from "@/components/BackOfficeSidebar";
import { Box, Grid } from "@radix-ui/themes";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <Box
      style={{
        backgroundColor: "orange",
        position: "relative",
        minHeight: "100vh",
        overflowY: "hidden",
        padding: "0 40px",
      }}>
      <Box
        position={"fixed"}
        style={{
          width: "20vw",
          top: 90,
        }}>
        <BackOfficeSidebar />
      </Box>

      <Box
        style={{
          minWidth: "75vw",
          maxHeight: "100vh",
          backgroundColor: "rebeccapurple",
          position: "absolute",
          top: 0,
          right: 0,
          overflowY: "auto",
        }}>
        <Box
          style={{
            maxWidth: "90%",
            minHeight: "100vh",
            margin: "auto",
            marginTop: 90,
          }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
