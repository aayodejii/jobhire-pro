import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { FormProvider } from "./contexts/FormContext";
import { SWRProvider } from "./contexts/SWRProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { AffiliateProvider } from "./contexts/AffiliateContext";
import { AffiliateTracker } from "./components/dashboard/AffiliateTracker";
// import { AuthProvider } from "./contexts/AuthContext";
import { GoogleTagManager } from "@next/third-parties/google";

const poppinso = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "NextRole",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinso.className} antialiased`}>
        {/* <AffiliateTracker autoTrackPageViews={true}> */}
        <AuthProvider>
          <AffiliateProvider>
            <SWRProvider>{children}</SWRProvider>
          </AffiliateProvider>
        </AuthProvider>
        {/* </AffiliateTracker> */}
      </body>
      <GoogleTagManager gtmId="GTM-W6JQ8D8X" />
    </html>
  );
}
