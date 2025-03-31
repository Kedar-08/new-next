"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  brand: string;
  category: string;
  rating: number;
  stock: number;
  discountPercentage: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const routeParams = useParams(); // ✅ Extract params using useParams
  const productId = routeParams.id as string;
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) =>
      index < Math.floor(rating) ? (
        <StarFilled key={index} size={16} className={styles.starFilled} />
      ) : (
        <Star key={index} size={16} className={styles.star} />
      )
    );
  };

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
                      <img
                        src={product.images[selectedImage]}
                        alt={product.title}
                        className={styles.mainImage}
                      />
                    </AspectRatio>
                    {hasMultipleImages && (
                      <div className={styles.thumbnailGrid}>
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`${styles.thumbnailButton} ${
                              selectedImage === index ? styles.selected : ""
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${product.title} - Image ${index + 1}`}
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
                        {product.tags?.map((tag, index) => (
                          <Tag key={index} type="blue" size="sm">
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
                                <StructuredListRow>
                                  <StructuredListCell>
                                    Weight
                                  </StructuredListCell>
                                  <StructuredListCell>
                                    {product.weight} kg
                                  </StructuredListCell>
                                </StructuredListRow>
                                <StructuredListRow>
                                  <StructuredListCell>
                                    Dimensions
                                  </StructuredListCell>
                                  <StructuredListCell>
                                    {product.dimensions.width} ×{" "}
                                    {product.dimensions.height} ×{" "}
                                    {product.dimensions.depth} cm
                                  </StructuredListCell>
                                </StructuredListRow>
                                <StructuredListRow>
                                  <StructuredListCell>
                                    Minimum Order
                                  </StructuredListCell>
                                  <StructuredListCell>
                                    {product.minimumOrderQuantity} units
                                  </StructuredListCell>
                                </StructuredListRow>
                                <StructuredListRow>
                                  <StructuredListCell>
                                    Warranty
                                  </StructuredListCell>
                                  <StructuredListCell>
                                    {product.warrantyInformation}
                                  </StructuredListCell>
                                </StructuredListRow>
                              </StructuredListBody>
                            </StructuredListWrapper>
                          </TabPanel>
                          <TabPanel>
                            <div className={styles.reviews}>
                              {product.reviews?.map((review, index) => (
                                <div key={index} className={styles.review}>
                                  <div className={styles.reviewHeader}>
                                    <div className={styles.stars}>
                                      {renderStars(review.rating)}
                                    </div>
                                    <span className="cds--type-body-compact-01">
                                      {new Date(
                                        review.date
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="cds--type-body-long-01">
                                    {review.comment}
                                  </p>
                                  <p className="cds--type-body-compact-01 mt-2">
                                    - {review.reviewerName}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div className={styles.shipping}>
                              <h3 className="cds--type-productive-heading-02">
                                Shipping Information
                              </h3>
                              <p className="cds--type-body-long-01 mt-2">
                                {product.shippingInformation}
                              </p>
                              <h3 className="cds--type-productive-heading-02 mt-4">
                                Return Policy
                              </h3>
                              <p className="cds--type-body-long-01 mt-2">
                                {product.returnPolicy}
                              </p>
                            </div>
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
