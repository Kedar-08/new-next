"use client";

import React, { useState } from "react";
import { Button, Stack, TextInput, Form } from "@carbon/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import styles from "./loginPage.module.scss";
import { signInWithGoogle } from "@/app/lib/firebase"; // ✅ Firebase imports

export default function Login() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().required("Full Name is required."),
      password: Yup.string()
        .trim()
        .min(6, "Password must be at least 6 characters.")
        .required("Password is required."),
    }),
    onSubmit: (values) => {
      try {
        localStorage.setItem("user", JSON.stringify(values));
        setMessage("Login successful! Redirecting...");

        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } catch {
        setMessage("Error submitting the form.");
      }
    },
  });

  // ✅ Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("Google Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/profile/user/dashboard");
      }, 500);
    } else {
      setMessage("Google Login failed. Try again.");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoTitle}>
        <Image src="/IBM_logo.svg.png" alt="IBM Logo" width={60} height={30} />
        <h2 className={styles.header}>IntelliSphere</h2>
      </div>
      <div className={styles.formContainer}>
        <h3>Login</h3>
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
          <Stack gap={5}>
            <TextInput
              id="fullName"
              labelText="Full Name"
              placeholder="Enter your full name"
              invalid={!!formik.errors.fullName && formik.touched.fullName}
              invalidText={formik.errors.fullName}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextInput
              id="password"
              type="password"
              labelText="Password"
              placeholder="Enter your password"
              invalid={!!formik.errors.password && formik.touched.password}
              invalidText={formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button type="submit" kind="tertiary">
              Login
            </Button>
          </Stack>
        </Form>
        {message && <p className={styles.message}>{message}</p>}

        {/* ✅ Google Login Button */}
        <div className={styles.googleLogin}>
          <span>Login with Google</span>
          <button onClick={handleGoogleSignIn} className={styles.googleButton}>
            <Image
              src="/icons8-google.svg"
              alt="Login with Google"
              width={25}
              height={25}
            />
          </button>
        </div>

        <p className={styles.signupRedirect}>
          Don&apos;t have an account? <Link href="/">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
