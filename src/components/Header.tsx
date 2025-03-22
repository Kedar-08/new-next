"use client";

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import { Notification, UserAvatar } from "@carbon/icons-react";

export default function GlobalHeader() {
  return (
    <Header aria-label="IBM IntelliSphere® Optim™">
      {/* Brand Name in Header */}
      <HeaderName href="/" prefix="IBM">
        IntelliSphere® Optim™
      </HeaderName>

      {/* Empty Header Navigation (Can add links if needed) */}
      <HeaderNavigation aria-label="IBM Navigation"></HeaderNavigation>

      {/* Right-side icons (Notifications, User Profile) */}
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notifications">
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User Profile">
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
