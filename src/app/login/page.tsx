"use client";

import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Button, Stack, Form } from "@carbon/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./loginPage.module.scss";
// import { signInWithGoogle } from "@/app/lib/firebase";
import TextInputField from "@/components/shared/textinput/TextInputField";

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required(t("auth.login.full_name_required")),
      password: Yup.string()
        .trim()
        .min(6, t("auth.login.password_min_length"))
        .required(t("auth.login.password_required")),
    }),
    onSubmit: (values) => {
      try {
        localStorage.setItem("user", JSON.stringify(values));
        setMessage(t("auth.login.success"));

        setTimeout(() => {
          router.push("/profile/user/dashboard");
        }, 500);
      } catch {
        setMessage(t("auth.login.error"));
      }
    },
  });

  // Handle Google Sign-In
  // const handleGoogleSignIn = async () => {
  //   const user = await signInWithGoogle();
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     setMessage(t("auth.google.success"));

  //     setTimeout(() => {
  //       router.push("/profile/user/dashboard");
  //     }, 500);
  //   } else {
  //     setMessage(t("auth.google.failed"));
  //   }
  // };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoTitle}>
        <Image src="/IBM_logo.svg.png" alt="IBM Logo" width={60} height={30} />
        <h2 className={styles.header}>{t("common.app_name")}</h2>
      </div>
      <div className={styles.formContainer}>
        <h3>{t("auth.login.title")}</h3>
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
          <Stack gap={5}>
            <TextInputField
              id="fullName"
              name="fullName"
              labelText={t("auth.login.full_name")}
              placeholder={t("auth.login.enter_full_name")}
              invalid={!!(formik.errors.fullName && formik.touched.fullName)}
              invalidText={t(formik.errors.fullName || "")}
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextInputField
              id="password"
              name="password"
              type="password"
              labelText={t("auth.login.password")}
              placeholder={t("auth.login.enter_password")}
              invalid={!!(formik.errors.password && formik.touched.password)}
              invalidText={t(formik.errors.password || "")}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button type="submit" kind="tertiary">
              {t("auth.login.title")}
            </Button>
          </Stack>
        </Form>
        {message && <p className={styles.message}>{message}</p>}

        {/* <div className={styles.googleLogin}>
          <span>{t("auth.login.login_with_google")}</span>
          <button onClick={handleGoogleSignIn} className={styles.googleButton}>
            <Image
              src="/icons8-google.svg"
              alt={t("auth.login.with_google")}
              width={25}
              height={25}
            />
          </button>
        </div> */}
        
        <p className={styles.signupRedirect}>
          {t("auth.login.no_account")}{" "}
          <Link href="/">{t("auth.signup.title")}</Link>
        </p>
      </div>
    </div>
  );
}
