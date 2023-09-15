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
        position: "relative",
        minHeight: "100vh",
        overflowY: "hidden",
        padding: "0 40px",
        backgroundColor: "#F6F9FC",
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
          position: "absolute",
          top: 0,
          right: 0,
          overflowY: "auto",
        }}>
        <Box
          style={{
            maxWidth: 840,
            minHeight: "100vh",
            margin: "auto",
            marginTop: 90,
            boxShadow: "0px 5px 10px 8px rgba(0, 0, 0, 0.5)",
            padding: 30,
          }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
