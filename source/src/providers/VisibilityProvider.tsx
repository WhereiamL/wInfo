import React, { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import { motion } from "framer-motion";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void;
  visible: boolean;
}

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  useNuiEvent<boolean>("setVisible", setVisible);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === "Escape" && visible) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(false);
      }
    };

    if (visible) {
      window.addEventListener("keydown", keyHandler);
    }

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  const bounceInAnimation = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      <div style={{ height: "100%", overflow: "hidden" }}>
        <motion.div
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          variants={bounceInAnimation}
          style={{ height: "100%" }}
        >
          {children}
        </motion.div>
      </div>
    </VisibilityCtx.Provider>
  );
};

export const useVisibility = () =>
  useContext<VisibilityProviderValue>(VisibilityCtx as React.Context<VisibilityProviderValue>);
