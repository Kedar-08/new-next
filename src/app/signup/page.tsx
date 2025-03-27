"use client";

import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Button, Stack } from "@carbon/react";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form as FormikForm, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./signupPage.module.scss";
import { useRouter } from "next/navigation";
import TextInputField from "@/components/shared/textinput/TextInputField";

// Define a TypeScript type for form values
interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
}

export default function Signup() {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().trim().required(t("auth.signup.full_name_required")),
    email: Yup.string()
      .trim()
      .email(t("auth.signup.invalid_email"))
      .required(t("auth.signup.email_required")),
    password: Yup.string()
      .trim()
      .min(6, t("auth.signup.password_min_length"))
      .required(t("auth.signup.password_required")),
  });

  const handleSubmit = async (
    values: SignupFormValues,
    { resetForm }: FormikHelpers<SignupFormValues>
  ) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setMessage(t("auth.signup.success"));
        resetForm();
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage(t("auth.signup.failed"));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage(t("auth.signup.error"));
    }
  };

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.logoTitle}>
        <Image src="/IBM_logo.svg.png" alt="IBM Logo" width={60} height={30} />
        <h2 className={styles.header}>{t("common.app_name")}</h2>
      </div>
      <div className={styles.formContainer}>
        <h3>{t("auth.signup.title")}</h3>
        <Formik
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm className={styles.form}>
              <Stack gap={5}>
                <Field
                  as={TextInputField}
                  id="fullName"
                  name="fullName"
                  labelText={t("auth.signup.full_name")}
                  placeholder={t("auth.signup.enter_full_name")}
                  invalid={!!(errors.fullName && touched.fullName)}
                  invalidText={t(errors.fullName || "")}
                />
                <Field
                  as={TextInputField}
                  id="email"
                  name="email"
                  type="email"
                  labelText={t("auth.signup.email")}
                  placeholder={t("auth.signup.enter_email")}
                  invalid={!!(errors.email && touched.email)}
                  invalidText={t(errors.email || "")}
                />
                <Field
                  as={TextInputField}
                  id="password"
                  name="password"
                  type="password"
                  labelText={t("auth.signup.password")}
                  placeholder={t("auth.signup.enter_password")}
                  invalid={!!(errors.password && touched.password)}
                  invalidText={t(errors.password || "")}
                />
                <Button type="submit" kind="tertiary">
                  {t("auth.signup.title")}
                </Button>
              </Stack>
            </FormikForm>
          )}
        </Formik>
        {message && <p className={styles.message}>{message}</p>}
        <p className={styles.loginRedirect}>
          {t("auth.signup.already_have_account")}{" "}
          <Link href="/login">{t("auth.login.title")}</Link>
        </p>
      </div>
    </div>
  );
}
