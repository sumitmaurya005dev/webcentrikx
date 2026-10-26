export const bookingUrl = "https://calendly.com/webcentrikx/30min";

const assetBase = "https://assets.calendly.com/assets/external";
let calendlyPromise;

function loadCalendly() {
  if (!calendlyPromise) {
    calendlyPromise = Promise.all([
      new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${assetBase}/widget.css`;
        link.onload = resolve;
        link.onerror = () => { link.remove(); reject(new Error("Calendly styles could not load")); };
        document.head.appendChild(link);
      }),
      new Promise((resolve, reject) => {
        if (window.Calendly?.initPopupWidget) { resolve(); return; }
        const script = document.createElement("script");
        script.src = `${assetBase}/widget.js`;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => { script.remove(); reject(new Error("Calendly could not load")); };
        document.body.appendChild(script);
      }),
    ]).catch(error => {
      calendlyPromise = undefined;
      throw error;
    });
  }
  return calendlyPromise;
}

export async function openCalendlyPopup() {
  await loadCalendly();
  if (!window.Calendly?.initPopupWidget) throw new Error("Calendly is unavailable");
  window.Calendly.initPopupWidget({ url: bookingUrl });
}
