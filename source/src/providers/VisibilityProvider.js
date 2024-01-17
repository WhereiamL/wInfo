import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import { motion } from "framer-motion";
const VisibilityCtx = createContext(null);
export const VisibilityProvider = ({ children, }) => {
    const [visible, setVisible] = useState(false);
    useNuiEvent("setVisible", setVisible);
    useEffect(() => {
        const keyHandler = (e) => {
            if (e.code === "Escape" && visible) {
                if (!isEnvBrowser())
                    fetchNui("hideFrame");
                else
                    setVisible(false);
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
    return (_jsx(VisibilityCtx.Provider, { value: {
            visible,
            setVisible,
        }, children: _jsx("div", { style: { height: "100%", overflow: "hidden" }, children: _jsx(motion.div, { initial: "hidden", animate: visible ? "visible" : "hidden", variants: bounceInAnimation, style: { height: "100%" }, children: children }) }) }));
};
export const useVisibility = () => useContext(VisibilityCtx);
