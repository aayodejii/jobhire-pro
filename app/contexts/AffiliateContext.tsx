"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAffiliateProfile } from "@/app/lib/affiliate";
import useSWR from "swr";
import { Affiliate } from "../types/types";

interface AffiliateContextType {
  affiliate: Affiliate | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const AffiliateContext = createContext<AffiliateContextType>({
  affiliate: null,
  isLoading: true,
  error: null,
  refresh: async () => {},
});

export const AffiliateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: affiliate,
    error,
    mutate,
    isLoading,
  } = useSWR<Affiliate | null>("affiliate-profile", getAffiliateProfile, {
    revalidateOnFocus: false,
  });

  return (
    <AffiliateContext.Provider
      value={{
        affiliate: affiliate || null,
        isLoading,
        error: error || null,
        refresh: async () => {
          await mutate();
        },
      }}
    >
      {children}
    </AffiliateContext.Provider>
  );
};

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (context === undefined) {
    throw new Error("useAffiliate must be used within an AffiliateProvider");
  }
  return context;
};
