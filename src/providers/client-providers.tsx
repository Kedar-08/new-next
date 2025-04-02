// src/providers/client-providers.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import I18nProvider from "./I18nProvider";
import { ReactNode } from "react";

interface ClientProvidersProps {
  readonly children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <Provider store={store}>
      <I18nProvider>{children}</I18nProvider>
    </Provider>
  );
}
