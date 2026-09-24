type Gtag = (command: "event", eventName: string, parameters: Record<string, string>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackEvent(eventName: string, parameters: Record<string, string>) {
  window.gtag?.("event", eventName, parameters);
}
