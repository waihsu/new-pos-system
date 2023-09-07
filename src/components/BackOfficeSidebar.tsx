"use client";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";

const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: <BiSolidDashboard />,
    route: "/backoffice/dashboard",
  },
  {
    id: 2,
    label: "Products",
    icon: <FaClipboardList />,
    route: "/backoffice/products",
  },
  {
    id: 3,
    label: "Orders",
    icon: <FaShoppingCart />,
    route: "/backoffice/orders",
  },
  { id: 4, label: "Users", icon: <FaUserAlt />, route: "/backoffice/users" },
  {
    id: 5,
    label: "Categories",
    icon: <BiSolidCategoryAlt />,
    route: "/backoffice/categories",
  },
  {
    id: 6,
    label: "Site Settings",
    icon: <AiFillSetting />,
    route: "/backoffice/siteSettings",
  },
  {
    id: 7,
    label: "Locations",
    icon: <AiFillSetting />,
    route: "/backoffice/locations",
  },
];

export default function BackOfficeSidebar() {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <Flex
      direction={"column"}
      pt={"8"}
      style={{
        backgroundColor: "ActiveBorder",
        minHeight: 450,
        borderRadius: 10,
      }}>
      {sidebarItems.map((item) => (
        <Flex key={item.id} align={"center"} justify={"start"} py={"2"}>
          <Link href={item.route} style={{ textDecoration: "none" }}>
            <Box
              ml={"5"}
              style={{ color: `${pathName === item.route ? "red" : "green"}` }}>
              {item.icon} {item.label}
            </Box>
          </Link>
        </Flex>
      ))}
    </Flex>
  );
}
