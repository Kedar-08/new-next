"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Column, Form, Stack } from "@carbon/react";
import GlobalDropdown from "@/components/shared/dropdown/GlobalDropdown";
import TextInputField from "@/components/shared/textinput/TextInputField";
import { useDispatch, useSelector } from "react-redux";
import { saveForm } from "@/redux/slices/formSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import styles from "./SubmitForm.module.scss"; // Import SCSS file
import FileInput from "@/components/shared/fileinput/FileInput";

// Define form state type
type UserFormState = {
  firstName: string;
  lastName: string;
  gender: string;
  relationship: string;
  fileName: string;
};

const SubmitForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);

  console.log("Redux State:", formData); // 🔥 Logs Redux state in the console

  // Define initial state for form values
  const [formValues, setFormValues] = useState<UserFormState>({
    firstName: "",
    lastName: "",
    gender: "",
    relationship: "",
    fileName: "",
  });

  // Load saved data when revisiting
  useEffect(() => {
    if (formData.isReadOnly) {
      setFormValues({
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        gender: formData.gender || "",
        relationship: formData.relationship || "",
        fileName: formData.fileName || "",
      });
    }
  }, [formData]);

  // Handle input changes
  const handleChange = (id: string, value: string | null) => {
    setFormValues((prev) => ({ ...prev, [id]: value ?? "" })); // Convert null to an empty string
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Dispatching form data to Redux:", formValues); // Logs form data before dispatch
    dispatch(saveForm(formValues));
    router.push("/profile/user/dashboard");
  };

  return (
    <Grid fullWidth className={styles.formContainer}>
      <Column sm={4} md={6} lg={8}>
        <Form>
          <Stack gap={7}>
            {/* First Name */}
            <TextInputField
              labelText={t("submitForm.firstName")}
              placeholder={t("submitForm.enterFirstName")}
              id="firstName"
              value={formValues.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={formData.isReadOnly}
              name=""
            />

            {/* Last Name */}
            <TextInputField
              labelText={t("submitForm.lastName")}
              placeholder={t("submitForm.enterLastName")}
              id="lastName"
              value={formValues.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={formData.isReadOnly}
              name=""
            />

            {/* Gender Dropdown */}
            <GlobalDropdown
              id="gender"
              label={t("submitForm.selectGender")}
              items={[
                t("submitForm.male"),
                t("submitForm.female"),
                t("submitForm.other"),
              ]}
              selectedItem={formValues.gender}
              onChange={(val) => handleChange("gender", val)}
              disabled={formData.isReadOnly}
            />

            {/* Relationship Dropdown */}
            <GlobalDropdown
              id="relationship"
              label={t("submitForm.selectRelationship")}
              items={[t("submitForm.single"), t("submitForm.married")]}
              selectedItem={formValues.relationship}
              onChange={(val) => handleChange("relationship", val)}
              disabled={formData.isReadOnly}
            />

            {/* File Input Field */}
            <FileInput
              id="fileInput"
              labelText={t("submitForm.fileInput")}
              placeholder={t("submitForm.noFileChosen")}
              value={formValues.fileName}
              onChange={(fileName) => handleChange("fileName", fileName)}
              disabled={formData.isReadOnly}
            />

            {/* Submit Button */}
            {!formData.isReadOnly && (
              <Button
                kind="primary"
                className={styles.submitBtn}
                onClick={handleSubmit}
              >
                {t("submitForm.submit")}
              </Button>
            )}
          </Stack>
        </Form>
      </Column>
    </Grid>
  );
};

export default SubmitForm;
