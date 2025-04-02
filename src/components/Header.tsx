/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Dropdown,
} from "@carbon/react";
import { Notification, UserAvatar } from "@carbon/icons-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function GlobalHeader() {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    { id: "en", label: "English" },
    { id: "fr", label: "Français" },
    { id: "ja", label: "日本語" },
    { id: "ru", label: "Русский" },
  ];

  const handleLanguageChange = (selectedItem?: { id: string; label: string } | null) => {
    if (selectedItem?.id) {
      i18n.changeLanguage(selectedItem.id);
      localStorage.setItem("language", selectedItem.id);
      setSelectedLanguage(selectedItem.label);
    }
  };

  // On component mount, retrieve the previously selected language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setSelectedLanguage(
        languages.find((lang) => lang.id === savedLanguage)?.label ?? "Select Language"
      );
      i18n.changeLanguage(savedLanguage);
    } else {
      setSelectedLanguage("Select Language");
    }
  }, [i18n]);

  return (
    <Header aria-label="IBM IntelliSphere® Optim™">
      {/* Brand Name in Header */}
      <HeaderName href="/" prefix="IBM">
        IntelliSphere®
      </HeaderName>

      {/* Empty Header Navigation (Can add links if needed) */}
      <HeaderNavigation aria-label="IBM Navigation"></HeaderNavigation>

      {/* Right-side icons (Notifications, User Profile) */}
      <HeaderGlobalBar>
        {/* Language Dropdown */}
        <Dropdown
          id="language-dropdown"
          label={selectedLanguage ?? t("select_language")}
          items={languages}
          itemToString={(item) => item?.label ?? ""}
          onChange={({ selectedItem }) => handleLanguageChange(selectedItem ?? null)}
          titleText={undefined}
        />

        {/* Notifications */}
        <HeaderGlobalAction aria-label={t("notifications")}>
          <Notification size={20} />
        </HeaderGlobalAction>

        {/* User Profile */}
        <HeaderGlobalAction aria-label={t("user_profile")}>
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
