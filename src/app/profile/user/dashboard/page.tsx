"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Grid, Column, Tile } from "@carbon/react";
import {
  Archive,
  InventoryManagement,
  Compare,
  Search,
} from "@carbon/icons-react";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      {/* Welcome Message */}
      <h3 className={styles.welcome}>{t("auth.dashboard.welcome")}</h3>
      <h4 className={styles.title}>{t("auth.dashboard.title")}</h4>

      {/* Grid Layout for Tiles */}
      <Grid condensed className={styles.grid}>
        <Column sm={4} md={8} lg={4}>
          <Tile
            className={styles.tile}
            onClick={() => router.push("/profile/user/dashboard/ArchiveTable")}
          >
            <Archive size={32} />
            {t("auth.dashboard.archive")}
          </Tile>
        </Column>
        <Column sm={4} md={8} lg={4}>
          <Tile
            className={styles.tile}
            onClick={() => router.push("/profile/user/dashboard/products")}
          >
            <InventoryManagement size={32} />
            {t("auth.dashboard.products")}
          </Tile>
        </Column>
        <Column sm={4} md={8} lg={4}>
          <Tile
            className={styles.tile}
            onClick={() => router.push("/profile/user/dashboard/dropdown-table")}
          >
            <Compare size={32} />
            {t("auth.dashboard.compare")}
          </Tile>
        </Column>
        <Column sm={4} md={8} lg={4}>
          <Tile
            className={styles.tile}
            onClick={() => router.push("/profile/user/dashboard/SubmitForm")}
          >
            <Search size={32} />
            {t("auth.dashboard.search")}
          </Tile>
        </Column>
      </Grid>
    </main>
  );
};

export default Dashboard;
