"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <>
      {/* Use the common header */}
      <GlobalHeader />

      <main style={{ padding: "2rem", marginTop: "3rem" }}>
        {/* Welcome Message */}
        <h3 style={{ marginBottom: "3rem" }}>{t("auth.dashboard.welcome")}</h3>
        <h4 style={{ marginBottom: "2rem" }}>{t("auth.dashboard.title")}</h4>

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
              {t("auth.dashboard.archive")}
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
              {t("auth.dashboard.products")}
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
              {t("auth.dashboard.compare")}
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
              {t("auth.dashboard.search")}
            </Button>
          </Column>
        </Grid>
      </main>
    </>
  );
};

export default Dashboard;
