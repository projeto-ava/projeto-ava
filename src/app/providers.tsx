"use client"

import React from "react";
import { ThemeProvider } from "next-themes";

interface IProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProvidersProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
