import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type OrgId = "fundit" | "tesmarine" | "capitalcorp";

export interface OrgConfig {
  id: OrgId;
  name: string;
  label: string;
  subtext: string;
  initial: string;
}

export const ORG_CONFIGS: Record<OrgId, OrgConfig> = {
  fundit: {
    id: "fundit",
    name: "FUNDiT",
    label: "FUNDiT",
    subtext: "People | Performance | Progress",
    initial: "F",
  },
  tesmarine: {
    id: "tesmarine",
    name: "TES Marine & Energy",
    label: "TES Marine & Energy",
    subtext: "Time Charter | Diving Support | Technical & Logistics",
    initial: "T",
  },
  capitalcorp: {
    id: "capitalcorp",
    name: "CAPITALCORP",
    label: "CapitalCorp",
    subtext: "Finance | Energy | Real Estate",
    initial: "C",
  },
};

interface OrgContextType {
  org: OrgId | null;
  orgConfig: OrgConfig | null;
  setOrg: (id: OrgId | null) => void;
}

const OrgContext = createContext<OrgContextType>({
  org: null,
  orgConfig: null,
  setOrg: () => {},
});

export const useOrg = () => useContext(OrgContext);

export function OrgProvider({ children }: { children: ReactNode }) {
  const [org, setOrgState] = useState<OrgId | null>(() => {
    return (localStorage.getItem("hrm_org") as OrgId | null) ?? null;
  });

  const setOrg = (id: OrgId | null) => {
    setOrgState(id);
    if (id) {
      localStorage.setItem("hrm_org", id);
    } else {
      localStorage.removeItem("hrm_org");
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (org) {
      root.setAttribute("data-org", org);
    } else {
      root.removeAttribute("data-org");
    }
  }, [org]);

  return (
    <OrgContext.Provider value={{ org, orgConfig: org ? ORG_CONFIGS[org] : null, setOrg }}>
      {children}
    </OrgContext.Provider>
  );
}
