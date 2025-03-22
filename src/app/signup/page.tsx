"use client";

import React, { useState } from "react";
import { Button, Stack, TextInput } from "@carbon/react";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import styles from "./signupPage.module.scss"; // Import SCSS
import { useRouter } from "next/navigation"; // ✅ Import Next.js router

// Define a TypeScript type for form values
interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full Name is required."),
  email: Yup.string().trim().email("Invalid email format.").required("Email is required."),
  password: Yup.string().trim().min(6, "Password must be at least 6 characters.").required("Password is required."),
});

export default function Signup() {
  const [message, setMessage] = useState("");
  const router = useRouter(); // ✅ Initialize Next.js router

  const handleSubmit = async (
    values: SignupFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setMessage("Signup successful! Redirecting...");
        resetForm();
        setTimeout(() => {
          router.push("/login"); // ✅ Correct navigation
        }, 2000);
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch {
      setMessage("Error submitting the form.");
    }
  };

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.logoTitle}>
      <Image src="/IBM_logo.svg.png" alt="IBM Logo" width={60} height={30} />
      <h2 className={styles.header}>IBM IntelliSphere Optim</h2>
      </div>
      <div className={styles.formContainer}>
        <h3>Signup</h3>
      <Formik
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm className={styles.form}>
              <Stack gap={5}>
                <Field
                  as={TextInput}
                  id="fullName"
                  name="fullName" // ✅ Added name
                  labelText="Name"
                  placeholder="Enter your full name"
                  invalid={!!(errors.fullName && touched.fullName)}
                  invalidText={errors.fullName}
                />
                <Field
                  as={TextInput}
                  id="email"
                  name="email" // ✅ Added name
                  type="email"
                  labelText="Email"
                  placeholder="Enter your email"
                  invalid={!!(errors.email && touched.email)}
                  invalidText={errors.email}
                />
                <Field
                  as={TextInput}
                  id="password"
                  name="password" // ✅ Added name
                  type="password"
                  labelText="Password"
                  placeholder="Enter your password"
                  invalid={!!(errors.password && touched.password)}
                  invalidText={errors.password}
                />
                <Button type="submit" kind="tertiary">
                  Signup
                </Button>
              </Stack>
            </FormikForm>
          )}
        </Formik>
        {message && <p className={styles.message}>{message}</p>}
        <p className={styles.loginRedirect}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
