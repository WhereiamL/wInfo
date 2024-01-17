import { isEnvBrowser } from './misc';
/**
 * Emulates dispatching an event using SendNuiMessage in the lua scripts.
 * This is used when developing in browser
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 */
export const debugData = (events, timer = 1000) => {
    if (import.meta.env.MODE === 'development' && isEnvBrowser()) {
        for (const event of events) {
            setTimeout(() => {
                window.dispatchEvent(new MessageEvent('message', {
                    data: {
                        action: event.action,
                        data: event.data,
                    },
                }));
            }, timer);
        }
    }
};
