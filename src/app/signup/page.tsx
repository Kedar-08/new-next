 "use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button, Stack, Grid, Column, Form } from "@carbon/react";
import Link from "next/link";
import Image from "next/image";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import TextInputField from "@/components/shared/textinput/TextInputField";
import "./signupPage.scss";

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

  return (
    <div className="signupWrapper">
      <div className="logoTitle">
        <Image src="/IBM_logo.svg.png" alt="IBM Logo" width={60} height={30} />
        <h2 className="header">{t("common.app_name")}</h2>
      </div>
      <div className="formContainer">
        <h3>{t("auth.signup.title")}</h3>

        <Formik
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                }
              );

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
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} className="form">
              <Grid>
                <Column sm={4} md={8} lg={16}>
                  <Stack gap={5}>
                    <TextInputField
                      id="fullName"
                      name="fullName"
                      labelText={t("auth.signup.full_name")}
                      placeholder={t("auth.signup.enter_full_name")}
                      invalid={!!(errors.fullName && touched.fullName)}
                      invalidText={t(errors.fullName || "")}
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <TextInputField
                      id="email"
                      name="email"
                      type="email"
                      labelText={t("auth.signup.email")}
                      placeholder={t("auth.signup.enter_email")}
                      invalid={!!(errors.email && touched.email)}
                      invalidText={t(errors.email || "")}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <TextInputField
                      id="password"
                      name="password"
                      type="password"
                      labelText={t("auth.signup.password")}
                      placeholder={t("auth.signup.enter_password")}
                      invalid={!!(errors.password && touched.password)}
                      invalidText={t(errors.password || "")}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <Button type="submit" kind="tertiary">
                      {t("auth.signup.title")}
                    </Button>
                  </Stack>
                </Column>
              </Grid>
            </Form>
          )}
        </Formik>

        {message && <p className="message">{message}</p>}

        <p className="loginRedirect">
          {t("auth.signup.already_have_account")}{" "}
          <Link href="/login">{t("auth.login.title")}</Link>
        </p>
      </div>
    </div>
  );
}
