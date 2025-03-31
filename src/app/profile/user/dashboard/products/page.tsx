"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Column,
  ClickableTile,
  AspectRatio,
  Loading,
  Search,
} from "@carbon/react";
import styles from "./products.module.scss";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function ProductsPage() {
  const { t } = useTranslation(); // ✅ Use translation hook
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading description={t("products.loading")} withOverlay={false} />
      </div>
    );
  }

  return (
    <>
      <main style={{ padding: "2rem", marginTop: "3rem" }}>
        <h3 style={{ marginBottom: "3rem" }}>{t("products.welcomeAdmin")}</h3>
        <h4 style={{ marginBottom: "2rem" }}>{t("products.products")}</h4>

        {/* Search Bar */}
        <Grid className={styles.searchContainer}>
          <Column sm={4} md={8} lg={8}>
            <Search
              labelText={t("products.searchLabel")}
              placeholder={t("products.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              className={styles.search}
            />
          </Column>
        </Grid>

        {/* Products Grid */}
        <Grid narrow className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <Column
              sm={4}
              md={4}
              lg={4}
              key={product.id}
              className={styles.column}
            >
              <ClickableTile
                className={styles.productTile}
                onClick={() =>
                  router.push(`/profile/user/dashboard/products/${product.id}`)
                }
              >
                <AspectRatio ratio="16x9">
                  <img
                    src={product.thumbnail}
                    alt={t("products.productImageAlt", {
                      title: product.title,
                    })}
                    className={styles.productImage}
                  />
                </AspectRatio>
                <div className={styles.productContent}>
                  <h3 className="cds--type-productive-heading-02">
                    {product.title}
                  </h3>
                  <p className="cds--type-body-long-01 mt-2">
                    {t("products.price", { price: product.price.toFixed(2) })}
                  </p>
                </div>
              </ClickableTile>
            </Column>
          ))}
        </Grid>
      </main>
    </>
  );
}
