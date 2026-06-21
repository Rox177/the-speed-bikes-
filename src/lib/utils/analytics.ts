export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  if (typeof window !== "undefined") {
    console.log(`[Analytics Event]: ${eventName}`, properties)
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_name: eventName, properties }),
    }).catch((err) => console.error("Failed to log event:", err))
  }
}
