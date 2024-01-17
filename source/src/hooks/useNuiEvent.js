import { useEffect, useRef } from "react";
import { noop } from "../utils/misc";
/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/
export const useNuiEvent = (action, handler) => {
    const savedHandler = useRef(noop);
    // Make sure we handle for a reactive handler
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
        const eventListener = (event) => {
            const { action: eventAction, data } = event.data;
            if (savedHandler.current) {
                if (eventAction === action) {
                    savedHandler.current(data);
                }
            }
        };
        window.addEventListener("message", eventListener);
        // Remove Event Listener on component cleanup
        return () => window.removeEventListener("message", eventListener);
    }, [action]);
};
