"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Grid, Column, Button } from "@carbon/react";
import {
  Archive,
  Download,
  Compare,
  Search,
  InventoryManagement,
} from "@carbon/icons-react";
import GlobalHeader from "@/components/Header";

const Dashboard = () => {
  const router = useRouter(); // Initialize Next.js router

  return (
    <>
      {/* Use the common header */}
      <GlobalHeader />

      <main style={{ padding: "2rem", marginTop: "3rem" }}>
        {/* Welcome Message */}
        <h3 style={{ marginBottom: "3rem" }}>Welcome, Admin</h3>
        <h4 style={{ marginBottom: "2rem" }}>Dashboard</h4>

        {/* Large Button Grid */}
        <Grid condensed style={{ gap: "1rem" }}>
          <Column sm={4} md={8} lg={4}>
            <Button
              kind="tertiary"
              renderIcon={() => <Archive size={32} />} // Larger icon
              iconDescription="" // Remove extra space
              onClick={() =>
                router.push("/profile/user/dashboard/ArchiveTable")
              }
              style={{
                width: "90%", // Reduce width
                height: "5rem",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem", // Reduce space between icon and text
              }}
            >
              Archive
            </Button>
          </Column>
          <Column sm={4} md={8} lg={4}>
            <Button
              kind="tertiary"
              renderIcon={() => <InventoryManagement size={32} />}
              iconDescription=""
              onClick={() => router.push("/profile/user/dashboard/products")}
              style={{
                width: "90%",
                height: "5rem",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              Products
            </Button>
          </Column>
          <Column sm={4} md={8} lg={4}>
            <Button
              kind="tertiary"
              renderIcon={() => <Compare size={32} />}
              iconDescription=""
              onClick={() =>
                router.push("/profile/user/dashboard/dropdown-table")
              }
              style={{
                width: "90%",
                height: "5rem",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              Compare
            </Button>
          </Column>
          <Column sm={4} md={8} lg={4}>
            <Button
              kind="tertiary"
              renderIcon={() => <Search size={32} />}
              iconDescription=""
              style={{
                width: "90%",
                height: "5rem",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              Search
            </Button>
          </Column>
        </Grid>
      </main>
    </>
  );
};

export default Dashboard;
