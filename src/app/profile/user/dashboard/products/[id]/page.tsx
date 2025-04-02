"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Grid,
  Column,
  Tile,
  Button,
  Loading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  AspectRatio,
  Content,
  Tag,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from "@carbon/react";
import { ArrowLeft, Star, StarFilled } from "@carbon/icons-react";
import styles from "./product.module.scss";
import { v4 as uuidv4 } from "uuid";

interface Review {
  readonly rating: number;
  readonly comment: string;
  readonly date: string;
  readonly reviewerName: string;
}
interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly thumbnail: string;
  readonly images: string[];
  readonly brand: string;
  readonly category: string;
  readonly rating: number;
  readonly stock: number;
  readonly discountPercentage: number;
  readonly tags: string[];
  readonly sku: string;
  readonly weight: number;
  readonly dimensions: {
    readonly width: number;
    readonly height: number;
    readonly depth: number;
  };
  readonly warrantyInformation: string;
  readonly shippingInformation: string;
  readonly availabilityStatus: string;
  readonly reviews: Review[];
  readonly returnPolicy: string;
  readonly minimumOrderQuantity: number;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const routeParams = useParams();
  const productId = routeParams.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading description="Loading product details..." withOverlay={false} />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) =>
      index < Math.floor(rating) ? (
        <StarFilled key={uuidv4()} size={16} className={styles.starFilled} />
      ) : (
        <Star key={uuidv4()} size={16} className={styles.star} />
      )
    );

  const hasMultipleImages = product.images.length > 1;

  return (
    <Content>
      <div className={styles.container}>
        <Button
          kind="ghost"
          className="mb-6"
          onClick={() => router.back()}
          renderIcon={ArrowLeft}
        >
          Back to Products
        </Button>
        <Grid narrow>
          <Column sm={4} md={8} lg={16}>
            <Tile className={styles.productTile}>
              <Grid narrow className={styles.productGrid}>
                <Column sm={4} md={4} lg={8}>
                  <div className={styles.imageContainer}>
                    <AspectRatio ratio="4x3">
                      <Image
                        src={product.images[selectedImage]}
                        alt={product.title}
                        width={500}
                        height={375}
                        className={styles.mainImage}
                      />
                    </AspectRatio>
                    {hasMultipleImages && (
                      <div className={styles.thumbnailGrid}>
                        {product.images.map((image, index) => (
                          <button
                            key={uuidv4()} // ✅ Unique key using uuid
                            onClick={() => setSelectedImage(index)}
                            className={`${styles.thumbnailButton} ${
                              selectedImage === index ? styles.selected : ""
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`Thumbnail ${index + 1} of ${product.title}`}
                              width={100}
                              height={75}
                              className={styles.thumbnail}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Column>
                <Column sm={4} md={4} lg={8}>
                  <div className={styles.productInfo}>
                    <div>
                      <div className={styles.tags}>
                        {product.tags?.map((tag) => (
                          <Tag key={uuidv4()} type="blue" size="sm">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <h1 className="cds--type-productive-heading-05">
                        {product.title}
                      </h1>
                      <p className="cds--type-body-long-01 mt-2">
                        by {product.brand}
                      </p>
                      <div className={styles.ratingContainer}>
                        <div className={styles.stars}>
                          {renderStars(product.rating)}
                        </div>
                        <span className="cds--type-body-compact-01">
                          {product.rating.toFixed(1)} / 5
                        </span>
                      </div>
                    </div>
                    <div className={styles.priceSection}>
                      <div className={styles.priceContainer}>
                        <p className="cds--type-productive-heading-04">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.discountPercentage > 0 && (
                          <Tag type="red">
                            {product.discountPercentage}% OFF
                          </Tag>
                        )}
                      </div>
                      <Tag
                        type={product.stock < 10 ? "red" : "green"}
                        className={styles.stockTag}
                      >
                        {product.availabilityStatus ||
                          (product.stock < 10 ? "Low Stock" : "In Stock")}
                      </Tag>
                    </div>
                    <div className={styles.tabs}>
                      <Tabs
                        selectedIndex={selectedTab}
                        onChange={({ selectedIndex }) =>
                          setSelectedTab(selectedIndex)
                        }
                      >
                        <TabList aria-label="Product details tabs">
                          <Tab>Description</Tab>
                          <Tab>Specifications</Tab>
                          <Tab>Reviews</Tab>
                          <Tab>Shipping</Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel>
                            <p className="cds--type-body-long-01 mt-4">
                              {product.description}
                            </p>
                          </TabPanel>
                          <TabPanel>
                            <StructuredListWrapper className={styles.specList}>
                              <StructuredListBody>
                                <StructuredListRow>
                                  <StructuredListCell>SKU</StructuredListCell>
                                  <StructuredListCell>
                                    {product.sku}
                                  </StructuredListCell>
                                </StructuredListRow>
                              </StructuredListBody>
                            </StructuredListWrapper>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </div>
                  </div>
                </Column>
              </Grid>
            </Tile>
          </Column>
        </Grid>
      </div>
    </Content>
  );
}
