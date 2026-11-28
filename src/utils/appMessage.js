export function showAppMessage(text, type = "info", duration = 5000) {
  window.dispatchEvent(
    new CustomEvent("app-message", {
      detail: { text, type, duration },
    }),
  );
}
